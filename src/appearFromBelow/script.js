import { isPageReady, onPageReady, prefersReducedMotion } from '../common';

import './style.scss';

export function useAppearFromBelow() {
    if (prefersReducedMotion) {
        return;
    }

    const elements = document.querySelectorAll('[data-animation="appear-from-below"]');

    if (!elements?.length) {
        return;
    }

    const intersectionObservers = {
        std: new IntersectionObserver(intersectionHandler, { rootMargin: '-20% 0% -20% 0%', threshold: 0 }),
    }

    elements.forEach((element) => {
        const delay = element.dataset.animationDelay;
        if (delay) {
            element.style.setProperty('--delay', delay);
        }
        element.classList.add('transition');
        const trigger = element.closest('[data-animation="appear-from-below-trigger"]') || element.parentElement;
        if (!trigger.elements) {
            trigger.elements = [];
        }
        trigger.elements.push(element);
        if (element.dataset.observerMargin) {
            createObserverAndObserve(element.dataset.observerMargin, trigger);
        } else {
            intersectionObservers.std.observe(trigger);
        }
    });

    function createObserverAndObserve(observerMargin, trigger) {
        if (!intersectionObservers[observerMargin]) {
            intersectionObservers[observerMargin] = new IntersectionObserver(intersectionHandler, { rootMargin: observerMargin, threshold: 0 });
        }
        intersectionObservers[observerMargin].observe(trigger);
    }

    function intersectionHandler(entries, observer) {
        entries.forEach((entry) => {
            const { isIntersecting, target } = entry;
            if (isIntersecting) {
                if (isPageReady()) {
                    show(target.elements);
                } else {
                    onPageReady(() => show(target.elements));
                }
                observer.unobserve(target);
            }
        });
    }

    function show(elements) {
        elements.forEach((element) => element.classList.add('shown'));
    }
}