import './style.scss';

/*
    Categories:
    'ai', '3d', 'about', 'educational', 'shop', 'contact'
*/

export function useScrollColors(glitchSection) {
    const linksElement = document.querySelector('.menulinks');
    const links = linksElement.querySelectorAll('a');
    const sectionBreaks = document.querySelectorAll('[data-animation="sections"]');
    const INITIAL_CHECK_MARGIN = 25;
    const SECTION_PREFIX = 'section-';

    const sections = [...sectionBreaks].map((sectionBreak) => sectionBreak.dataset.section);
    
    let currentSectionIndex = -1;
    
    const topObserver = new IntersectionObserver(handleTopIntersection, { rootMargin: '0% 0% -50% 0%', threshold: 1 });
    const bottomObserver = new IntersectionObserver(handleBottomIntersection, { rootMargin: '-50% 0% 0% 0%', threshold: 1 });
    sectionBreaks.forEach((sectionBreak) => {
        const { top } = sectionBreak.getBoundingClientRect();
        if (top > document.documentElement.clientHeight / 2 - INITIAL_CHECK_MARGIN) {
            topObserver.observe(sectionBreak);
        } else {
            bottomObserver.observe(sectionBreak);
        }
    });
    
    linksElement.style.setProperty('--num-steps', links.length);

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
            document.body.classList.remove(`${SECTION_PREFIX}${currentSection}`);
        }
        if (index > -1) {
            document.body.classList.add(`${SECTION_PREFIX}${section}`);
            setMenuLinksPosition(index);
            glitchSection?.(section);
        } else {
            setMenuLinksPosition(0);
        }
        currentSectionIndex = index;
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
