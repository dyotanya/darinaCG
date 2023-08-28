import './style.scss';

export function useRunningLine() {
    const container = document.querySelector('[data-style="runner-container"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            } else {
                entry.target.classList.remove('animated');
            }
        });
    });

    observer.observe(container);
}