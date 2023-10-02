import { getIsTouch, prefersReducedMotion } from "../common";

import './style.scss';

export function useCursor() {
    if (getIsTouch() || prefersReducedMotion) {
        return;
    }
    const documentStyles = getComputedStyle(document.documentElement);
    const color = documentStyles.getPropertyValue('--page-color') || documentStyles.getPropertyValue('--red') || '#bb4b36';
    const SPEED_COEFF = 0.01;
    const RADIUS = 8;
    const HOVER_RADIUS = 25;
    const pixelRatio = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    canvas.classList.add('cursor-canvas');
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    const interactiveElementSelectors = 'a, [data-animation="cursor-hover"], .portfolioimage';
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
        radius: RADIUS,
        targetRadius: RADIUS,
        lastX: mouse.x,
        lastY: mouse.y,
    };
    let prevTime;

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
        const timeDiff = (timestamp - prevTime) * SPEED_COEFF;
        circle.lastX = lerp(circle.lastX, mouse.x, timeDiff);
        circle.lastY = lerp(circle.lastY, mouse.y, timeDiff);

        resizeCircle(timeDiff);

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.4;
        
        ctx.clearRect(0, 0, size.width, size.height);
        ctx.beginPath();
        ctx.arc(circle.lastX, circle.lastY, circle.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

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

        elems.forEach((el) => {
            el.addEventListener("mouseenter", () => circle.targetRadius = HOVER_RADIUS, false);
            el.addEventListener("mouseleave", () => circle.targetRadius = RADIUS, false);
        });
    }

    function smoothChange(curr, target, timeDiff) {
        const SPEED = 0.05;
        const TOLERANCE = 0.1;
        const leng = target - curr;
        const rise = 0.8 * Math.sign(leng) * Math.cbrt(SPEED * timeDiff * Math.abs(leng) * Math.abs(leng));
        if (Math.abs(rise) < TOLERANCE) {
            return target;
        }
        return curr + rise;
    }

    function resizeCircle(timeDiff) {
        circle.radius = smoothChange(circle.radius, circle.targetRadius, timeDiff);
    }

    function lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }

    init();
}
