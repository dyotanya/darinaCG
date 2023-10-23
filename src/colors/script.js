import { getIsDesktop, useOnResize, isPageReady, onPageReady, isMainPage } from '../common';

import './style.scss';

export function useScrollColors(glitchSection, setMenuSection) {
    if (!isMainPage()) {
        return;
    }

    const wrapper = document.querySelector('.wrapper');
    const sectionBreaks = [...document.querySelectorAll('[data-animation="sections"]')]
        .filter((sectionBreak) => sectionBreak.dataset.section !== 'educational');  // TODO: remove with the "coming soon"
    const INITIAL_CHECK_MARGIN = 25;
    const SECTION_PREFIX = 'section-';
    const colorIntersectionObserver = new IntersectionObserver(colorIntersectionHandler);
    const colorChangingElements = document.querySelectorAll('.contentlink, .keyboardletter, .sectionheadingbreak');

    const sections = [...sectionBreaks].map((sectionBreak) => sectionBreak.dataset.section);
    
    let currentSectionIndex = -1;
    let topObserver;
    let bottomObserver;

    useOnResize(init, getIsDesktop);

    if (isPageReady()) {
        init(getIsDesktop());
    } else {
        onPageReady(() => init(getIsDesktop()));
    }
    colorChangingElements.forEach((element) => colorIntersectionObserver.observe(element));

    function colorIntersectionHandler(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('color-transition');
            } else {
                entry.target.classList.remove('color-transition');
            }
        });
    }

    function init(isDesktop) {
        topObserver && topObserver.disconnect();
        bottomObserver && bottomObserver.disconnect();

        const observers = getObservers(isDesktop);
        topObserver = observers.topObserver;
        bottomObserver = observers.bottomObserver;
    
        sectionBreaks.forEach((sectionBreak) => {
            const { top } = sectionBreak.getBoundingClientRect();
            if (top > document.documentElement.clientHeight / 2 - INITIAL_CHECK_MARGIN) {
                topObserver.observe(sectionBreak);
            } else {
                bottomObserver.observe(sectionBreak);
            }
        });

        setInitialState();
    }

    function getObservers(isDesktop) {
        let topMargin = '0% 0% -50% 0%';
        let bottomMargin = '-50% 0% 0% 0%';

        if (!isDesktop) {
            topMargin = '0% 0% -30% 0%';
            bottomMargin = '-70% 0% 0% 0%';
        }

        const topObserver = new IntersectionObserver(handleTopIntersection, { rootMargin: topMargin, threshold: 1 });
        const bottomObserver = new IntersectionObserver(handleBottomIntersection, { rootMargin: bottomMargin, threshold: 1 });

        return { topObserver, bottomObserver };
    }

    function setInitialState() {
        const nextSectionBreak = [...sectionBreaks].find((sectionBreak) => {
            const { top } = sectionBreak.getBoundingClientRect();
            return top > document.documentElement.clientHeight / 2 - INITIAL_CHECK_MARGIN;
        });
        if (nextSectionBreak) {
            const previousSection = getSectionIndex(nextSectionBreak.dataset.section) - 1;
            setSection(previousSection);
        } else {
            setSection(sections.length - 1);
        }
    }

    function handleTopIntersection(entries) {
        entries.forEach((entry) => {
            const { isIntersecting, target } = entry;
            if (isIntersecting) {
                const sectionIndex = getSectionIndex(target.dataset.section);
                setSection(sectionIndex);
                topObserver.unobserve(target);
                bottomObserver.observe(target);
            }
        });
    }

    function handleBottomIntersection(entries) {
        entries.forEach((entry) => {
            const { isIntersecting, target } = entry;
            if (isIntersecting) {
                const sectionIndex = getSectionIndex(target.dataset.section);
                setSection(sectionIndex - 1);
                bottomObserver.unobserve(target);
                topObserver.observe(target);
            }
        });
    }

    function getSectionIndex(section) {
        return sections.indexOf(section);
    }

    function setSection(index) {
        if (index === currentSectionIndex) {
            return;
        }
        const section = sections[index];
        const currentSection = sections[currentSectionIndex];
        if (currentSection) {
            wrapper.classList.remove(`${SECTION_PREFIX}${currentSection}`);
        }
        if (index > -1) {
            wrapper.classList.add(`${SECTION_PREFIX}${section}`);
            setMenuSection(index);
            glitchSection?.(section);
        } else {
            setMenuSection(0);
        }
        currentSectionIndex = index;
        setTimeout(() => {
            const sectionColor = getComputedStyle(wrapper).getPropertyValue('--color');
            window.setCursorColor?.(sectionColor);
        }, 50);
    }
};
