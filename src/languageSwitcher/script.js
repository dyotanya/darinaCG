import { getLanguage } from '../common';

import './style.scss';

export function useLanguageSwitcher() {
    const switchers = document.querySelectorAll('.languagesswitcher');
    const activeLanguage = getLanguage();

    switchers.forEach((switcher) => {
        const links = switcher.querySelectorAll('.languagelink');
        links.forEach((link) => {
            if (link.dataset.language === activeLanguage) {
                link.classList.add('disabled');
                link.setAttribute('aria-disabled', 'true');
            }
        });
    });
};
