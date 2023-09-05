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
