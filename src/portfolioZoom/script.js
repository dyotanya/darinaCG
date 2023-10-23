import { getIsMobile, animate } from '../common';

import './style.scss';

export function usePortfolioZoom() {
    const popup = document.querySelector('.imagepopup');
    if (!popup) {
        return;
    }
    const closeButton = popup.querySelector('.imagepopupclosebutton');
    const nextButton = popup.querySelector('.imagepopupbutton.next');
    const prevButton = popup.querySelector('.imagepopupbutton.prev');
    const imageElements = {
        current: popup.querySelector('.imagepopupimage:not(.next)'),
        next: popup.querySelector('.imagepopupimage.next'),
    };
    const loading = popup.querySelector('.imagepopuploading');

    let currentIndex, currentSources, isChanging = false;

    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);
    closeButton.addEventListener('click', closePopup);
    
    document.querySelectorAll('.portfoliocategory').forEach(initCategory);

    function initCategory(block) {
        const images = block.querySelectorAll('.portfolioimage');
        const sources = [...images].map((image) => image.getAttribute('src'));

        images.forEach((image, index) => {
            image.addEventListener('click', () => {
                if (!getIsMobile()) {
                    openPopup(index, sources);
                }
            });
        });
    }

    function showPopup() {
        animate(popup, { removeClass: 'hidden', timeout: 5 })
            .then((popup) => popup.classList.add('visible'));
        document.documentElement.classList.add('popup-opened');
    }

    function hidePopup() {
        animate(popup, { removeClass: 'visible' })
            .then((popup) => {
                popup.classList.add('hidden');
                document.documentElement.classList.remove('popup-opened');
            });
    }

    function openPopup(index, sources) {
        currentIndex = index;
        currentSources = sources;

        showImage(index, imageElements.current);

        showPopup();
        document.addEventListener('keydown', onKeyPress);
    }

    function closePopup() {
        currentIndex = 0;
        currentSources = [];

        hidePopup();
        document.removeEventListener('keydown', onKeyPress);
    }

    function onKeyPress(event) {
        if (event.key === 'ArrowRight') {
            return nextImage();
        }
        if (event.key === 'ArrowLeft') {
            return prevImage();
        }
    }

    function showImage(index, image = imageElements.next) {
        currentIndex = index;
        if (image === imageElements.current) {
            return image.setAttribute('src', currentSources[index]);
        }
        isChanging = true;
        imageElements.current.classList.remove('visible');

        function onLoad() {
            imageElements.next.removeEventListener('load', onLoad);
            loading.classList.remove('visible');
            animate(imageElements.next, { addClass: 'visible' })
                .then(() => {
                    const current = imageElements.current;
                    imageElements.current = imageElements.next;
                    imageElements.next = current;
                    imageElements.current.classList.remove('next');
                    imageElements.next.classList.add('next');
                    isChanging = false;
                });
        }

        imageElements.next.addEventListener('load', onLoad);
        if (imageElements.next.getAttribute('src') === currentSources[index]) {
            imageElements.next.setAttribute('src', '');
        }
        loading.classList.add('visible');
        setTimeout(() => imageElements.next.setAttribute('src', currentSources[index]), 10);
    }

    function nextImage() {
        if (isChanging) {
            return;
        }
        const newIndex = currentIndex < currentSources.length - 1 ? currentIndex + 1 : 0;
        showImage(newIndex);
    }

    function prevImage() {
        if (isChanging) {
            return;
        }
        const newIndex = currentIndex > 0 ? currentIndex - 1 : currentSources.length - 1;
        showImage(newIndex);
    }
};
