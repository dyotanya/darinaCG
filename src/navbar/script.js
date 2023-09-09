import './style.scss';

export function useNavbar() {
    const navbar = document.querySelector('.navigation');

    document.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navbar.classList.add('bordered');
        } else {
            navbar.classList.remove('bordered');
        }
    });
};
