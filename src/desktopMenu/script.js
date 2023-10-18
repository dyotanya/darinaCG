import { getIsDesktop } from '../common';

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

    links.forEach((link) => {
        const { page } = link.dataset;
        link.addEventListener('mouseenter', () => setColor(page));
        link.addEventListener('mouseleave', () => setColor(null));
    });

    function setColor(page = null) {
        const color = page && COLORS[page] ? COLORS[page] : '';
        menu.style.setProperty('--desktop-menu-color', color);
    }
};
