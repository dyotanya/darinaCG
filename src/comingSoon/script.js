import { animate } from "../common";

import './style.scss';

const CATEGORIES = ['guides', 'tutorials', 'libraries', 'printed art', 'walpapers', 'cources', 'trainings'];

export function useComingSoon() {
    const progress = document.querySelector('.cominsoonprogress');
    const progressText = document.querySelector('.cominsoonprogress span');
    const text = document.querySelector('.comingsooncategorytext');
    let timeout;

    const textObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            changeText(0);
        } else {
            clearTimeout(timeout);
        }
    }, { threshold: 0 });

    const progressObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setProgress();
            progressObserver.disconnect();
        }
    }, { threshold: 0, rootMargin: '-15% 0% -15% 0%' });

    textObserver.observe(text);
    progressObserver.observe(progress);

    function changeText(index = 0) {
        clearInterval(timeout);
        text.textContent = CATEGORIES[index];
        const nextIndex = index < CATEGORIES.length - 1 ? index + 1 : 0;
        timeout = setTimeout(() => changeText(nextIndex), 500);
    }

    function setProgress() {
        animate(progress, { addClass: 'shown' })
            .then(() => progressText.classList.add('shown'));
    }
}