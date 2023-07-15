export function useGlitch() {
    const letters = document.querySelectorAll('[data-animation="glitch"]');
    const observer = new IntersectionObserver(handleIntersection, { threshold: 1, rootMargin: '-30% 0%' });
    const DELAY = 150;
    const ITERATIONS = 6;

    letters.forEach((letter) => observer.observe(letter));

    function handleIntersection(entries) {
        let delay = 0;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                doGlitch(entry.target, delay++);
                observer.unobserve(entry.target);
            }
        });
    }

    function doGlitch(target, delay) {
        const value = target.textContent;
        const length = value.length;

        const callStack = [];
        for (let i = 0; i < ITERATIONS; i++) {
            callStack.push(() => iterate(target, length), wait);
        }

        const call = callStack.reduce((acc, fn) => {
            return acc.then(fn);
        }, new Promise((res) => setTimeout(res, delay * DELAY)));

        call.then(() => target.textContent = value);
    }

    function iterate(target, length) {
        target.textContent = generateRandomString(length);
        return Promise.resolve();
    }

    function wait() {
        return new Promise((res) => setTimeout(res, DELAY));
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
};
