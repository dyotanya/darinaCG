import { prefersReducedMotion, isPageReady } from '../common';

import './style.scss';

export function useAppearFromBelow() {
    if (prefersReducedMotion) {
        return;
    }

    const elements = document.querySelectorAll('[data-animation="appear-from-below"]');

    if (!elements?.length) {
        return;
    }

    if (isPageReady()) {
        return show(elements);
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const { isIntersecting, target } = entry;
            if (isIntersecting) {
                show(target.elements);
                intersectionObserver.unobserve(target);
            }
        });
    }, { rootMargin: '-20% 0% -20% 0%', threshold: 0 });

    elements.forEach((element) => {
        const delay = element.dataset.animationDelay;
        if (delay) {
            element.style.setProperty('--delay', delay);
        }
        element.classList.add('transition');
        const triggerEvent = element.dataset.triggerEvent;
        if (triggerEvent) {
            const onTrigger = () => {
                element.classList.add('shown');
                window.removeEventListener(triggerEvent, onTrigger);
            };
            window.addEventListener(triggerEvent, onTrigger);
            return null;
        }
        const parent = element.parentElement;
        if (!parent.elements) {
            parent.elements = [];
        }
        parent.elements.push(element);
        intersectionObserver.observe(parent)
    });

    function show(elements) {
        elements.forEach((element) => element.classList.add('shown'));
    }
}