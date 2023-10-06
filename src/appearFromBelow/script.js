import { prefersReducedMotion } from '../common';

import './style.scss';

export function useAppearFromBelow() {
    if (prefersReducedMotion) {
        return;
    }

    const elements = document.querySelectorAll('[data-animation="appear-from-below"]');

    if (!elements?.length) {
        return;
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const { isIntersecting, target } = entry;
            if (isIntersecting) {
                show(target.element);
                intersectionObserver.unobserve(target);
            }
        });
    }, { rootMargin: '-20% 0% -20% 0%', threshold: 0 });

    elements.forEach((element) => {
        element.classList.add('transition');
        const parent = element.closest('*');
        parent.element = element;
        intersectionObserver.observe(parent);
    });

    function show(element) {
        element.classList.add('shown');
    }
}