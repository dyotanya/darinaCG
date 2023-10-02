import { prefersReducedMotion } from "../../common";

import './style.scss';

export function useFlyingPhotos() {
    if (prefersReducedMotion) {
        return;
    }

    const groups = document.querySelectorAll('.flyingphotosgroup');

    groups.forEach((group) => {
        const section = group.dataset.section;
        const trigger = document.querySelector(`.workareastag[data-section="${section}"]`);
        if (!trigger) {
            return console.error(`No trigger for ${section} flyting photos`);
        }
        trigger.addEventListener('mouseenter', () => {
            showSection(group);
        });
        trigger.addEventListener('mouseleave', () => {
            hideSection(group);
        });

        const photos = group.querySelectorAll('.flyingphoto');
        photos.forEach((photo, index) => {
            photo.style.setProperty('--delay', `${index * 0.1}s`);
        });
    });

    function showSection(group) {
        group.classList.add('shown');
    }

    function hideSection(group) {
        group.classList.remove('shown');
    }
};
