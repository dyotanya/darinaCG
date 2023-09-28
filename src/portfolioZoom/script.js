import { getIsMobile } from '../common';

import './style.scss';

export function usePortfolioZoom() {
    const popup = document.querySelector('.imagepopup');
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
        popup.classList.add('shown');
        setTimeout(() => popup.classList.add('visible'), 5);
        document.documentElement.classList.add('popup-opened');
    }

    function hidePopup() {
        const onInvisible = () => {
            popup.removeEventListener('transitionend', onInvisible);
            popup.classList.remove('shown');
            document.documentElement.classList.remove('popup-opened');
        };
        popup.addEventListener('transitionend', onInvisible);
        popup.classList.remove('visible');
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
