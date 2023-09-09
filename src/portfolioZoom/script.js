import './style.scss';

export function usePortfolioZoom() {
    document.querySelectorAll('.portfoliocategory').forEach(initCategory);
    let currentIndex, currentSources;

    function initCategory(block) {
        const images = block.querySelectorAll('.portfolioimage');
        const sources = [...images].map((image) => image.getAttribute('src'));

        images.forEach((image, index) => {
            image.addEventListener('click', () => openPopup(index, sources));
        });
    }

    function openPopup(index, sources) {
        currentIndex = index;
        currentSources = sources;
        console.log('open', index, sources);

        document.addEventListener('keydown', onKeyPress);
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
        console.log('show: ', index, currentSources[index]);
    }

    function closePopup() {
        console.log('close');
        document.removeEventListener('keydown', onKeyPress);
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
