// import { gsap } from "gsap";
import { getIsTouch } from "../common";

import './style.scss';

export function useCursor() {
    if (getIsTouch()) {
        return;
    }
    const pixelRatio = window.devicePixelRatio || 1;
    const speedCoeff = 0.01;
    const radius = 6;
    const canvas = document.createElement('canvas');
    canvas.classList.add('cursor-canvas');
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    const interactiveElementSelectors = 'a, [data-animation="cursor-hover"]';
    const elems = document.querySelectorAll(interactiveElementSelectors);

    const size = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    const mouse = {
        x: size.width / 2,
        y: size.height / 2,
    }
    const circle = {
        radius: radius,
        lastX: mouse.x,
        lastY: mouse.y,
    };
    const dots = [];
    let prevTime;

    // setInterval(() => {
    //     if (dots.length >= 25) {
    //         dots.shift();
    //     }
    //     dots.push({ x: circle.lastX, y: circle.lastY });
    // }, 1);

    function onResize() {
        size.width = canvas.width = window.innerWidth * pixelRatio;
        size.height = canvas.height = window.innerHeight * pixelRatio;

        if (pixelRatio > 1) {
            ctx.scale(pixelRatio, pixelRatio);
        }
    }

    function render(timestamp) {
        if (!prevTime) {
            prevTime = timestamp;
        }
        const timeDiff = (timestamp - prevTime) * speedCoeff;
        circle.lastX = lerp(circle.lastX, mouse.x, timeDiff);
        circle.lastY = lerp(circle.lastY, mouse.y, timeDiff);

        ctx.fillStyle = "white";
        
        ctx.clearRect(0, 0, size.width, size.height);
        ctx.beginPath();
        ctx.arc(circle.lastX, circle.lastY, circle.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        // dots.forEach(({ x, y }) => {
        //     ctx.beginPath();
        //     ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        //     ctx.fill();
        //     ctx.closePath();
        // });

        prevTime = timestamp;
        requestAnimationFrame(render);
    }

    function init() {
        onResize();
        requestAnimationFrame(render);

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener("resize", onResize, false);

        // const tween = gsap.to(circle, {
        //     radius: circle.radius * 3,
        //     ease: 'power1.easeInOur',
        //     paused: true,
        //     duration: 0.25,
        // });

        // elems.forEach((el) => {
        //     el.addEventListener("mouseenter", () => tween.play(), false);
        //     el.addEventListener("mouseleave", () => tween.reverse(), false);
        // });
    }

    function lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }

    init();
}
