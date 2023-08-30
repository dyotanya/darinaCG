import { useMenu } from "./src/menu/script";
import { useZomingPhotos } from "./src/zoomingPhotos/script";
import { useGlitch } from "./src/glitch/script";
import { useScrollColors } from "./src/colors/script";
import { useCursor } from "./src/cursor/script";
import { useRunningLine } from "./src/runningLine/script";
import { useBurgerMenu } from "./src/burger/script";
import { useAppearByLine } from "./src/texts/script";

import './src/styles/common.scss';
import './src/styles/home.scss';

const setMenuSection = useMenu();
const glitchSection = useGlitch();
useScrollColors(glitchSection, setMenuSection);
useBurgerMenu();
useZomingPhotos();
useCursor();
useRunningLine();
useAppearByLine();