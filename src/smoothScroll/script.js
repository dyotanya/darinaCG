import SmoothScroll from "smoothscroll-for-websites";

export function useSmoothScroll() {
    SmoothScroll({
        // Scrolling Core
        animationTime    : 700, // [ms]
        stepSize         : 120, // [px]
    
        // Acceleration
        accelerationDelta : 20,  // 50
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
        touchpadSupport   : true, // ignore touchpad by default
        fixedBackground   : false, 
        excluded          : '' 
    });
}