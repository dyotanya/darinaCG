import './style.scss';

export function useParallaxingPhotos() {
    const MAX_SHIFT = 15;
    const SCALE = 1 + 2 * MAX_SHIFT / 100;
    const observer = new IntersectionObserver(handleIntersection);
    const images = document.querySelectorAll('[data-animation="parallax"], .portfolioimage');
    const watching = new Set([]);
    let isHandlingScroll = false;
    
    images.forEach((image) => {
        image.style.setProperty('--zoom', SCALE);
        observer.observe(image);
    });
    window.addEventListener('load', handleScroll);

    function handleIntersection(entries) {
        entries.forEach((entry) => {
            const { isIntersecting, target, boundingClientRect: { bottom, height } } = entry;
            if (isIntersecting) {
                watching.add(target);
                const zoom = getShift(bottom, height);
                setImageShift(target, zoom);
            } else {
                watching.delete(target);
                setImageShift(target, bottom < 0 ? MAX_SHIFT : 0);
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

    function getShift(bottom, height) {
        const viewHeight = document.documentElement.clientHeight;
        const coeff = bottom / (viewHeight + height);
        const shift = 1 + MAX_SHIFT * coeff;
        return Math.round((shift + Number.EPSILON) * 1000) / 1000;
    }

    function handleScroll() {
        watching.forEach((entry) => {
            const { bottom, height } = entry.getBoundingClientRect();
            const zoom = getShift(bottom, height);
            setImageShift(entry, zoom);
        });
    }

    function setImageShift(element, shift) {
        element.style.setProperty('--shift', shift);
    }
}
