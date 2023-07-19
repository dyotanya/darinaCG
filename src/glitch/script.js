export function useGlitch() {
    const DELAY = 150;
    const ITERATIONS = 6;

    const letters = [...document.querySelectorAll('[data-animation="glitch"]')].reduce((acc, letter) => {
        const { section } = letter.dataset;
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(letter);
        return acc;
    }, {});

    function glitchSection(section) {
        if (letters[section]) {
            letters[section].forEach(async (letter, index) => doGlitch(letter, DELAY * index));
            letters[section] = null;
        }
    }

    async function doGlitch(target, delay) {
        const value = target.firstElementChild.textContent;
        const length = value.length;

        const callStack = [];
        for (let i = 0; i < ITERATIONS; i++) {
            callStack.push((el) => iterate(el, length), wait);
        }

        callStack
            .reduce((acc, fn) => {
                return acc.then(fn);
            }, new Promise((res) => setTimeout(() => res(target), delay)))
            .then((el) => el.textContent = value);
    }

    function iterate(target, length) {
        target.firstElementChild.textContent = generateRandomString(length);
        return Promise.resolve(target);
    }

    function wait(target) {
        return new Promise((res) => setTimeout(() => {
            res(target);
        }, DELAY));
    }

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        const arr = [];

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            arr.push(characters.charAt(randomIndex));
        }

        return arr.join('');
    }

    return glitchSection;
};
