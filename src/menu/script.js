import { getIsDesktop } from '../common';

import './style.scss';

export function useMenu() {
    const isDesktop = getIsDesktop();
    const mobileMenu = document.querySelector('.mobilemenu');

    const linksElement = document.querySelector(isDesktop ? '.menulinks' : '.mobilemenulinks');
    const links = linksElement.querySelectorAll('a');
    
    linksElement.style.setProperty('--num-steps', links.length);

    if (!isDesktop) {
        document.addEventListener('scroll', shrinkMenu);
        shrinkMenu();
    }

    function setMenuSection(index) {
        linksElement.style.setProperty('--step', index);
        links.forEach((link, i) => {
            if (index === i) {
                link.classList.remove('inactive');
            } else {
                link.classList.add('inactive');
            }
        });
    }

    function shrinkMenu() {
        if (window.scrollY > 0) {
            mobileMenu.classList.add('shrink');
        } else {
            mobileMenu.classList.remove('shrink');
        }
    }

    return setMenuSection;
};
