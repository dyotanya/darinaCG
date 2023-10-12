import './style.scss';

export const useImageLoad = () => {
    const images = document.querySelectorAll('img');

    images.forEach((image) => {
        if (image.dataset.noLoadAnimation || (image.complete && image.naturalHeight > 0)) {
            return image.classList.add('visible');
        }

        image.addEventListener('load', onLoad);
    });

    function onLoad({ target } = {}) {
        if (!target) {
            return;
        }
        target.classList.add('transition');
        setTimeout(() => target.classList.add('visible'), 10);
    }
};
