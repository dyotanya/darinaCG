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
        const onTransitionEnd = (event) => {
            if (event && (event.target !== element || event.pseudoElement)) {
                return;
            }
            element.removeEventListener('transitionend', onTransitionEnd);
            res(element);
        };

        if (timeout) {
            setTimeout(() => {
                res(element);
            }, timeout);
        } else {
            element.addEventListener('transitionend', onTransitionEnd);
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

export const isPageTransitioning = () => document.documentElement.classList.contains('is-changing')
    || document.documentElement.classList.contains('is-animating')
    || document.documentElement.classList.contains('is-rendering');

export const isPreloading = () => !!document.querySelector('.preloader');

const pageReadyEventName = 'page-ready';
export const pageReadyEvent = new Event(pageReadyEventName);

export const onPageReady = (callback) => {
    if (!window.pageReadyCallstack) {
        window.pageReadyCallstack = [];
    }
    window.pageReadyCallstack.push(callback);

    if (!window.onPageReadyEvent) {
        window.onPageReadyEvent = () => {
            window.pageReadyCallstack.forEach((callback) => callback?.());
            window.removeEventListener(pageReadyEventName, window.onPageReadyEvent);
            window.onPageReadyEvent = null;
        };
        window.addEventListener(pageReadyEventName, window.onPageReadyEvent);
    }
};

export const isPageReady = () => !isPreloading() && !isPageTransitioning();
