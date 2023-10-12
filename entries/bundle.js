import { useMenu } from "../src/menu/script";
import { useNavbar } from "../src/navbar/script";
import { useParallaxingPhotos } from "../src/parallaxingPhotos/script";
import { useGlitch } from "../src/glitch/script";
import { useScrollColors } from "../src/colors/script";
import { useCursor } from "../src/cursor/script";
import { useRunningLine } from "../src/runningLine/script";
import { usePopups } from "../src/popups/script";
import { useAppearByLine } from "../src/texts/script";
import { useAppearFromBelow } from "../src/appearFromBelow/script";
import { useComingSoon } from "../src/comingSoon/script";
import { useContentBlock, setScrollBarWidthListener, unblockScroll } from "../src/common";
import { useTags } from "../src/about/tags/script";
import { useFlyingPhotos } from "../src/about/flyingPhotos/script";
import { useAboutSlideshow } from "../src/about/slideshow/script";
import { usePortfolioSwitch } from "../src/portfolioSwitch/script";
import { usePortfolioZoom } from "../src/portfolioZoom/script";
import { useSmoothScroll } from "../src/smoothScroll/script";
import { useImageLoad } from "../src/imageLoad/script";
import { swup } from "../src/pageTransitions/script";

import "../src/styles/common.scss";
import "../src/styles/page.scss";
import "../src/styles/home.scss";
import "../src/styles/burger.scss";
import "../src/darStudioRender/style.scss";
import "../src/portfolioDoubleImages/style.scss";

// Run once when page loads
if (document.readyState === "complete") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => init());
}
// Run after every additional navigation by swup
swup?.hooks.on("page:view", () => init());

function init() {
  if (!document.querySelector('.preloader')) {
    unblockScroll();
  }
  window.setPreloader?.(60);
  useContentBlock();
  setScrollBarWidthListener();
  const setMenuSection = useMenu();
  const glitchSection = useGlitch();
  useScrollColors(glitchSection, setMenuSection);
  usePopups();
  useImageLoad();
  useParallaxingPhotos();
  useCursor();
  useRunningLine();
  useAppearByLine();
  useAppearFromBelow();
  useComingSoon();
  useNavbar();
  useTags();
  useRunningLine();
  useFlyingPhotos();
  useAboutSlideshow();
  usePortfolioSwitch();
  usePortfolioZoom();
  useParallaxingPhotos();
  useSmoothScroll();
}
