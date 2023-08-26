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

(() => {
    const moveAccordeon = () => {
        const products = document.querySelectorAll('.js-store-product');

        if (!products.length) {
            return;
        }

        products.forEach((product) => {
            const info = product.querySelector('.t-store__prod-popup__info');
            const accordeon = product.querySelector('.js-store-tabs');

            if (info && accordeon) {
                info.append(accordeon);
            }
        });
    };

    moveAccordeon();
})();