import { prefersReducedMotion } from '../common';

import './style.scss';

export function useParallaxingPhotos() {
    if (prefersReducedMotion) {
        return;
    }

    const MAX_SHIFT = 15;
    const PORTFOLIO_MAX_SHIFT = 10;
    const observer = new IntersectionObserver(handleIntersection);
    const resizeObserver = new ResizeObserver(handleResize);
    const images = document.querySelectorAll('[data-animation="parallax"], .portfolioimage');
    const watching = new Set([]);
    let isHandlingScroll = false;
    
    images.forEach((image) => {
        if (image.dataset.maxShift) {
            image.maxShift = image.dataset.maxShift;
        } else if (image.classList.contains('portfolioimage')) {
            image.maxShift = PORTFOLIO_MAX_SHIFT;
        } else {
            image.maxShift = MAX_SHIFT;
        }
        const scale = 1 + 2 * image.maxShift / 100;
        image.style.setProperty('--zoom', scale);
        observer.observe(image);
    });
    window.addEventListener('load', handleScroll);

    function handleResize(entries) {
        entries.forEach((entry) => {
            const { target } = entry;
            !!target.debounce && clearTimeout(target.debounce);

            target.debounce = setTimeout(() => {
                const { bottom, height } = target.getBoundingClientRect();
                const zoom = getShift(bottom, height, target.maxShift);
                setImageShift(target, zoom);
            }, 200);
        });
    }

    function handleIntersection(entries) {
        entries.forEach((entry) => {
            const { isIntersecting, target, boundingClientRect: { bottom, height } } = entry;
            if (isIntersecting) {
                watching.add(target);
                const zoom = getShift(bottom, height, target.maxShift);
                setImageShift(target, zoom);
                resizeObserver.observe(target);
            } else {
                watching.delete(target);
                setImageShift(target, bottom < 0 ? 0 : target.maxShift || MAX_SHIFT);
                resizeObserver.unobserve(target);
            }
        });
        
        if (watching.size > 0 && !isHandlingScroll) {
            document.addEventListener('scroll', handleScroll);
            isHandlingScroll = true;
            return;
        }
        if (watching.size === 0 && isHandlingScroll) {
            document.removeEventListener('scroll', handleScroll);
            isHandlingScroll = false;
            return;
        }
    }

    function getShift(bottom, height, maxShift = MAX_SHIFT) {
        const viewHeight = document.documentElement.clientHeight;
        const coeff = bottom / (viewHeight + height);
        const shift = 1 + maxShift * coeff;
        return Math.round((shift + Number.EPSILON) * 1000) / 1000;
    }

    function handleScroll() {
        watching.forEach((target) => {
            const { bottom, height } = target.getBoundingClientRect();
            const zoom = getShift(bottom, height, target.maxShift);
            setImageShift(target, zoom);
        });
    }

    function setImageShift(element, shift) {
        element.style.setProperty('--shift', shift);
    }
}
