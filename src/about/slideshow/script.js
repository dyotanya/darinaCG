export function useAboutSlideshow() {
    const urls = [
        'https://uploads-ssl.webflow.com/64ad0ab68d0150d89b44a63e/6512ec79ced75c2abc9efbe9_SLIDE%201.png',
        'https://uploads-ssl.webflow.com/64ad0ab68d0150d89b44a63e/6512ed5a7d51ba682807f694_SLIDE%202.png',
        'https://uploads-ssl.webflow.com/64ad0ab68d0150d89b44a63e/6512ed7876a5c2b0e5b26956_SLIDE%203.png',
        'https://uploads-ssl.webflow.com/64ad0ab68d0150d89b44a63e/6512ed780ef76e600c8e0fe0_SLIDE%204.png',
    ];
    let images;
    let current = 0;
    let isIntersecting = false;
    let timeout;
    const image = document.querySelector('.aboutsecondblocktextsimage');

    const observer = new IntersectionObserver((entries) => {
        isIntersecting = entries[0].isIntersecting;
        if (isIntersecting) {
            startSlideshow();
        } else {
            stopSlideshow();
        }
    });

    observer.observe(image);

    const promises = urls.map(url => fetch(url).then(res => res.blob()));

    Promise.allSettled(promises)
        .then(results => results.filter(res => res.status === 'fulfilled'))
        .then(results => {
            images = results.map(res => URL.createObjectURL(res.value));
            startSlideshow();
        })
        .catch(console.log);

    function startSlideshow() {
        if (isIntersecting && !timeout && images?.length > 0) {
            setNext();
        }
    }

    function stopSlideshow() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }

    function setNext() {
        requestAnimationFrame(() => {
            if (image.getAttribute('srcset')) {
                image.removeAttribute('srcset');
            }
            const nextIndex = current >= images.length - 1 ? 0 : current + 1;
            image.setAttribute('src', images[nextIndex]);
            current = nextIndex;
            timeout = setTimeout(setNext, 1200);
        });
    }
}