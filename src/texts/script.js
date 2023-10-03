import { prefersReducedMotion, animate } from '../common';

import './style.scss';

export function useAppearByLine() {
    if (prefersReducedMotion) {
        return;
    }

    const elements = document.querySelectorAll('[data-animation="appear-by-line"]');

    if (!elements?.length) {
        return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            initDuplicate(entry.target.original);
        }
    });

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const { isIntersecting, target } = entry;
            if (isIntersecting) {
                showLines(target);
                intersectionObserver.unobserve(target);
            }
        });
    }, { rootMargin: '-20% 0% -20% 0%', threshold: 1 });

    elements.forEach(initDuplicate);

    function showLines(element) {
        resizeObserver.unobserve(element);

        animate(element.lastSpan, { action: () => element.classList.add('shown') })
            .then(() => {
                element.original.classList.remove('hidden');
                element.remove();
            });
    }

    function initDuplicate(element) {
        const copied = element.clone || element.cloneNode();
        // Build an array of each word used in the original title
        const allWords = element.innerText.match(/\S+/g) || [];
        // The array we will fill with each line
        const lines = [];
        // The current line we are working on building
        let cumulativeText = '';
        let currentLine = '';
        let currentHeight = 0;

        const lineHeight = getComputedStyle(element).lineHeight;
        
        element.after(copied);
        copied.style.setProperty('--line-height', lineHeight);
        element.classList.add('hidden');
    
        // Work through the words until we're filling the correct amount of space
        for (var i = 0; i < allWords.length; i++) {
            // Build a new line and check if it is now too large for the container
            const newLine = currentLine + allWords[i] + " ";
            cumulativeText += allWords[i] + " ";
            copied.innerText = cumulativeText;
    
            if (currentHeight !== 0 && copied.clientHeight > currentHeight) {
                // If the line is now larger, use the previous line (without the last added word) and reset the current line to just the last word
                lines.push(currentLine.trim());
                currentLine = allWords[i] + " ";
            } else {
                // If it's not long enough yet, just keep adding words
                currentLine = newLine;
            }
            currentHeight = copied.clientHeight;
        }
        // Push any unfinshed final line to the array
        lines.push(currentLine.trim());
        
        copied.innerHTML = '';
        lines.forEach((line, index) => {
            const span = document.createElement('span');
            span.textContent = line;
            const p = document.createElement('p');
            p.appendChild(span);
            copied.appendChild(p);

            if (index === lines.length - 1) {
                copied.lastSpan = span;
            }
        });

        if (!element.clone) {
            element.clone = copied;
            copied.original = element;
            resizeObserver.observe(copied);
            intersectionObserver.observe(copied);
        }
    }
}