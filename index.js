import { useZomingPhotos } from "./src/zoomingPhotos/script";
import { useGlitch } from "./src/glitch/script";
import SmoothScroll from "smoothscroll-for-websites";
import { useCursor } from "./src/cursor/script";
import './src/common.css';

if (!window.isCustomCodeInitialized) {
    useZomingPhotos();
    useGlitch();
    useCursor();
    SmoothScroll({
        // Scrolling Core
        animationTime    : 800, // [ms]
        stepSize         : 100, // [px]
    
        // Acceleration
        accelerationDelta : 5,  // 50
        accelerationMax   : 3,   // 3
    
        // Keyboard Settings
        keyboardSupport   : true,  // option
        arrowScroll       : 300,    // [px]
    
        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm   : true,
        pulseScale       : 4,
        pulseNormalize   : 1,
    
        // Other
        touchpadSupport   : false, // ignore touchpad by default
        fixedBackground   : false, 
        excluded          : '' 
    });

    window.isCustomCodeInitialized = true;
}
