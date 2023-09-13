import { blockScroll, unblockScroll } from '../common';

import './style.scss';

export function useBurgerMenu() {
    const burger = document.querySelector('.burgermenu');
    const openBtn = document.querySelector('[data-trigger="burger"]');
    const closeBtn = document.querySelector('.burgermenubutton');

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);

    function open() {
        burger.classList.add('opened');
        blockScroll();
    }

    function close() {
        burger.classList.remove('opened');
        unblockScroll();
    }
};
