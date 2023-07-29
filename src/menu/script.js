import { getIsDesktop, useOnResize } from '../common';

import './style.scss';

export function useMenu() {
    const mobileMenu = document.querySelector('.mobilemenu');
    const linksElements = {
        desktop: document.querySelector('.menulinks'),
        mobile: document.querySelector('.mobilemenulinks'),
    }

    let linksElement;
    let links;

    useOnResize(init, getIsDesktop, 250);

    init(getIsDesktop());

    function init(isDesktop) {
        if (isDesktop) {
            linksElement = linksElements.desktop;
            document.removeEventListener('scroll', shrinkMenu);
        } else {
            linksElement = linksElements.mobile;
            document.addEventListener('scroll', shrinkMenu);
            shrinkMenu();
        }

        links = linksElement.querySelectorAll('a');
        linksElement.style.setProperty('--num-steps', links.length);
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