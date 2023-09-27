import { blockScroll, unblockScroll } from '../common';

import './style.scss';

export function usePopups() {
    const popups = document.querySelectorAll('[data-popup-id]');

    popups.forEach((popup) => {
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
        popup.classList.remove('hidden');
        blockScroll();
    }

    function close(popup) {
        popup.classList.add('hidden');
        unblockScroll();
    }
}