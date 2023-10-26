class Animation {
    constructor(element, options) {
        this.element = element;
        this.handler = null;
        this.timeout = null;

        this.promise = this.createPromise(element, options);
    }

    createPromise(element, options) {
        const { addClass, removeClass, action, timeout } = options;

        return new Promise((res) => {
            this.handler = (event) => {
                if (event && (event.target !== element || event.pseudoElement)) {
                    return;
                }
                element.removeEventListener('transitionend', this.handler);
                res(element);
            };
    
            if (timeout) {
                this.timeout = setTimeout(() => {
                    res(element);
                }, timeout);
            } else {
                element.addEventListener('transitionend', this.handler);
            }
    
            if (action) {
                return action(element);
            }
    
            if (addClass) {
                this.addClasses(element, addClass)
            }
    
            if (removeClass) {
                this.removeClasses(element, removeClass);
            }
        });
    }

    break() {
        clearTimeout(this.timeout);
        this.element.removeEventListener('transitionend', this.handler);
    }

    addClasses(element, cn) {
        if (Array.isArray(cn)) {
            element.classList.add(...cn);
        } else {
            element.classList.add(cn);
        }
    }

    removeClasses(element, cn) {
        if (Array.isArray(cn)) {
            element.classList.remove(...cn);
        } else {
            element.classList.remove(cn);
        }
    }
}

export default Animation;
