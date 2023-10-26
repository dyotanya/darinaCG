import { getIsDesktop, animateWithBreak } from '../common';

import './style.scss';

export function useDesktopMenu() {
    const menu = document.querySelector('[data-popup-id="desktop-menu"]');
    if (!menu || !getIsDesktop()) {
        return;
    }
    const COLORS = {
        ai: 'var(--red)',
        '3d': 'var(--green)',
        about: 'var(--black)',
        contact: 'var(--red)',
    }
    const links = menu.querySelectorAll('.desktopmenulink');

    links.forEach((link, index) => {
        const img = link.querySelector('img');
        link.addEventListener('mouseenter', () => {
            const { page } = link.dataset;
            setColor(page);
            (index > 0) && showImage(img);
        });
        link.addEventListener('mouseleave', () => {
            setColor(null);
            (index > 0) && hideImage(img);
        });
    });

    function showImage(img) {
        if (img.classList.contains('hiding')) {
            img.animation.break();
            img.classList.remove('hiding');
        }
        img.animation = animateWithBreak(img, { addClass: ['shown', 'showing'] });
        img.animation.promise.then(() => img.classList.remove('showing'));
    }

    function hideImage(img) {
        if (img.classList.contains('showing')) {
            console.log('here')
            img.animation.break();
            img.classList.remove('showing');
        }
        img.animation = animateWithBreak(img, { addClass: ['shown', 'hiding'] });
        img.animation.promise.then(() => img.classList.remove('shown', 'hiding'));
    }

    function setColor(page = null) {
        const color = page && COLORS[page] ? COLORS[page] : '';
        menu.style.setProperty('--desktop-menu-color', color);
        window.setCursorColor?.(color);
    }
};
