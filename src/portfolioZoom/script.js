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
    const image = popup.querySelector('.imagepopupimage');

    let currentIndex, currentSources;

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
        animate(popup, { addClass: 'shown', timeout: 5 })
            .then((popup) => popup.classList.add('visible'));
        document.documentElement.classList.add('popup-opened');
    }

    function hidePopup() {
        animate(popup, { removeClass: 'visible' })
            .then((popup) => {
                popup.classList.remove('shown');
                document.documentElement.classList.remove('popup-opened');
            });
    }

    function openPopup(index, sources) {
        currentIndex = index;
        currentSources = sources;

        showImage(index);

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

    function showImage(index) {
        currentIndex = index;
        image.setAttribute('src', currentSources[index]);
    }

    function nextImage() {
        const newIndex = currentIndex < currentSources.length - 1 ? currentIndex + 1 : 0;
        showImage(newIndex);
    }

    function prevImage() {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : currentSources.length - 1;
        showImage(newIndex);
    }
};
