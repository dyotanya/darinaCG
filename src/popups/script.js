import { blockScroll, unblockScroll, animate } from '../common';

import './style.scss';

export function usePopups() {
    const popups = document.querySelectorAll('[data-popup-id]');

    popups.forEach((popup) => {
        popup.classList.add('common-popup');
        const id = popup.dataset.popupId;
        const trigger = document.querySelector(`[data-popup-trigger="${id}"]`);
        if (!trigger) {
            return console.error(`No trigger for the ${id} popup`);
        }
        const closeBtn = popup.querySelector('[data-popup-close]');

        trigger.addEventListener('click', () => open(popup));
        closeBtn.addEventListener('click', () => close(popup));
        popup.addEventListener('click', (event) => {
            if (event?.target === popup) {
                close(popup);
            }
        });
    });

    function open(popup) {
        animate(popup, { addClass: 'transparent', timeout: 5 })
            .then(() => {
                return animate(popup, { removeClass: 'hidden', timeout: 5 });
            })
            .then(() => {
                animate(popup, { removeClass: 'transparent' });
            });
        blockScroll();
    }

    function close(popup) {
        animate(popup, { addClass: 'transparent' })
            .then(() => {
                popup.classList.add('hidden');
                unblockScroll();
            });
    }
}