export const getScreenWidth = () => document.documentElement.clientWidth;

export const getIsDesktop = () => getScreenWidth() > 991;

export const getIsMobile = () => getScreenWidth() < 500;

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
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (currentValue !== `${scrollBarWidth}px`) {
            document.documentElement.style.setProperty('--scroll-bar-width', `${scrollBarWidth}px`);
        }
    });
    window.scrollBarListener.observe(document.documentElement);
}

export const blockScroll = () => document.documentElement.classList.add('popup-opened');

export const unblockScroll = () => document.documentElement.classList.remove('popup-opened');

export const animate = (element, options) => {
    const { addClass, removeClass, action, timeout } = options;

    return new Promise((res) => {
        const onTransitionEnd = () => {
            element.removeEventListener('transitionend', onTransitionEnd);
            res(element);
        };

        element.addEventListener('transitionend', onTransitionEnd);

        if (timeout) {
            setTimeout(() => {
                onTransitionEnd();
            }, timeout);
        }

        if (action) {
            return action(element);
        }

        if (addClass) {
            element.classList.add(addClass);
        }

        if (removeClass) {
            element.classList.remove(removeClass);
        }
    });
};
