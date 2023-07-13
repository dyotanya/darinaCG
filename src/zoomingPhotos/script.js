import './style.scss';

export function useZomingPhotos() {
    const MIN_ZOOM = 1;
    const MAX_ZOOM = 1.2;
    const ZOOM_RANGE = MAX_ZOOM - MIN_ZOOM;
    const observer = new IntersectionObserver(handleIntersection);
    const images = document.querySelectorAll('[data-animation="scroll-zoom"]');
    images.forEach((image) => observer.observe(image));

    const watching = new Set([]);

    document.addEventListener('scroll', handleScroll);

    function handleIntersection(entries) {
        entries.forEach((entry) => {
            const { isIntersecting, target, boundingClientRect: { bottom, height } } = entry;
            if (isIntersecting) {
                watching.add(target);
                const zoom = getZoom(bottom, height);
                setImageZoom(target, zoom);
            } else {
                watching.delete(target);
                setImageZoom(target, bottom < 0 ? MIN_ZOOM : MAX_ZOOM);
            }
        });
    }

    function getZoom(bottom, height) {
        const viewHeight = document.documentElement.clientHeight;
        const coeff = bottom / (viewHeight + height);
        const zoom = 1 + ZOOM_RANGE * coeff;
        return Math.round((zoom + Number.EPSILON) * 1000) / 1000;
    }

    function handleScroll() {
        watching.forEach((entry) => {
            const { bottom, height } = entry.getBoundingClientRect();
            const zoom = getZoom(bottom, height);
            setImageZoom(entry, zoom);
        });
    }

    function setImageZoom(element, zoom) {
        element.style.setProperty('--zoom', zoom);
    }
}
