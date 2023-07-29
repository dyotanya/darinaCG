import './style.scss';

export function useWorkedWith() {
    const container = document.querySelector('.aboutworkedwithcontainer');

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