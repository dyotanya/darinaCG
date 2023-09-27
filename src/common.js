export const getScreenWidth = () => document.documentElement.clientWidth;

export const getIsDesktop = () => getScreenWidth() > 991;

export const getIsTouch = () => 'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

export const useOnResize = (handler, getCondition, delay = 200) => {
    let debounce;
    let prevValue;

    window.addEventListener('resize', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            const value = getCondition();
            if (value !== prevValue) {
                handler(value);
                prevValue = value;
            }
        }, delay);
    });
};

export const prefersReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

const isDevEnv = window.location.href.includes('webflow.io');

export function useContentBlock() {
    if (!isDevEnv) {
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        document.addEventListener('copy', (e) => e.preventDefault());
    }
}

export function setScrollBarWidthListener() {
    if (window.scrollBarListener) {
        return;
    }
    window.scrollBarListener = new ResizeObserver(() => {
        const currentValue = document.documentElement.style.getPropertyValue('--scroll-bar-width');
        console.log('currentValue', currentValue);
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        console.log('scrollBarWidth', scrollBarWidth);
        if (currentValue !== `${scrollBarWidth}px`) {
            document.documentElement.style.setProperty('--scroll-bar-width', `${scrollBarWidth}px`);
        }
    });
    window.scrollBarListener.observe(document.documentElement);
}

export const blockScroll = () => document.documentElement.classList.add('popup-opened');

export const unblockScroll = () => document.documentElement.classList.remove('popup-opened');
