const CATEGORIES = ['guides', 'tutorials', 'libraries', 'printed art', 'walpapers', 'cources', 'trainings'];

export function useComingSoon() {
    const text = document.querySelector('.comingsooncategorytext');
    let timeout;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            changeText(0);
        } else {
            clearTimeout(timeout);
        }
    }, { threshold: 0 });

    observer.observe(text);

    function changeText(index = 0) {
        clearInterval(timeout);
        text.textContent = CATEGORIES[index];
        const nextIndex = index < CATEGORIES.length - 1 ? index + 1 : 0;
        timeout = setTimeout(() => changeText(nextIndex), 500);
    }
}