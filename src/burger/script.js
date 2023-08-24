import './style.scss';

export function useBurgerMenu() {
    const burger = document.querySelector('.burgermenu');
    const openBtn = document.querySelector('.mobilemenubutton');
    const closeBtn = document.querySelector('.burgermenubutton');

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scroll-bar-width', `${scrollBarWidth}px`);

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);

    function open() {
        burger.classList.add('opened');
        document.documentElement.classList.add('scroll-blocked');
    }

    function close() {
        burger.classList.remove('opened');
        document.documentElement.classList.remove('scroll-blocked');
    }
};
