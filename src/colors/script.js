import './style.scss';

/*
    Categories:
    ai
    3d
    about
    products*
    contacts
*/

export function useScrollColors(glitchSection) {
    const linksElement = document.querySelector('.menulinks');
    const links = linksElement.querySelectorAll('a');
    const sectionBreaks = document.querySelectorAll('[data-animation="sections"]');
    const INITIAL_CHECK_MARGIN = 25;
    const SECTION_PREFIX = 'section-';

    const sections = [...sectionBreaks].map((sectionBreak) => sectionBreak.dataset.section);
    
    const watching = new Set([]);
    let currentSection;
    let isHandlingScroll = false;
    
    const observer = new IntersectionObserver(handleIntersection, { rootMargin: '-40% 0%' });
    sectionBreaks.forEach((sectionBreak) => observer.observe(sectionBreak));

    setInitialState();

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

    function handleIntersection(entries) {
        entries.forEach((entry) => {
            const { isIntersecting, target } = entry;
            if (isIntersecting) {
                watching.add(target);
                if (watching.size > 0 && !isHandlingScroll) {
                    document.addEventListener('scroll', handleScroll);
                    isHandlingScroll = true;
                }
            } else {
                watching.delete(target);
                if (watching.size === 0 && isHandlingScroll) {
                    document.removeEventListener('scroll', handleScroll);
                    isHandlingScroll = false;
                }
            }
        });
    }

    function getSectionIndex(section) {
        return sections.indexOf(section);
    }

    function handleScroll() {
        watching.forEach((entry) => {
            const { top } = entry.getBoundingClientRect();
            const sectionIndex = getSectionIndex(entry.dataset.section);
            setSection(top < document.documentElement.clientHeight / 2 ? sectionIndex : sectionIndex - 1);
        });
    }

    function setSection(index) {
        const section = sections[index];
        if (section === currentSection) {
            return;
        }
        if (currentSection) {
            document.body.classList.remove(`${SECTION_PREFIX}${currentSection}`);
        }
        if (index > -1) {
            document.body.classList.add(`${SECTION_PREFIX}${section}`);
            currentSection = section;
            setMenuLinksPosition(index);
            glitchSection?.(section);
        } else {
            setMenuLinksPosition(0);
        }
    }

    function setMenuLinksPosition(index) {
        linksElement.style.setProperty('--step', index);
        links.forEach((link, i) => {
            if (index === i) {
                link.classList.remove('inactive');
            } else {
                link.classList.add('inactive');
            }
        });
    }
};
