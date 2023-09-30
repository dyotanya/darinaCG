import { useMenu } from "../src/menu/script";
import { useParallaxingPhotos } from "../src/parallaxingPhotos/script";
import { useGlitch } from "../src/glitch/script";
import { useScrollColors } from "../src/colors/script";
import { useCursor } from "../src/cursor/script";
import { useRunningLine } from "../src/runningLine/script";
import { usePopups } from "../src/popups/script";
import { useAppearByLine } from "../src/texts/script";
import { useComingSoon } from "../src/comingSoon/script";
import { useContentBlock, setScrollBarWidthListener } from "../src/common";

import '../src/styles/common.scss';
import '../src/styles/home.scss';

useContentBlock();
setScrollBarWidthListener();
const setMenuSection = useMenu();
const glitchSection = useGlitch();
useScrollColors(glitchSection, setMenuSection);
usePopups();
useParallaxingPhotos();
useCursor();
useRunningLine();
useAppearByLine();
useComingSoon();