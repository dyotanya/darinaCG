import { useRunningLine } from "./src/runningLine/script";
import { useParallaxingPhotos } from "./src/parallaxingPhotos/script";
import { usePortfolioSwitch, DAR_CATEGORIES } from "./src/portfolioSwitch/script";
import { usePortfolioZoom } from "./src/portfolioZoom/script";

import './src/darStudioRender/style.scss';
import './src/portfolioDoubleImages/style.scss';

usePortfolioSwitch(DAR_CATEGORIES);
usePortfolioZoom();
useRunningLine();
useParallaxingPhotos();