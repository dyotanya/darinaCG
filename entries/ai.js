import { useParallaxingPhotos } from "../src/parallaxingPhotos/script";
import { usePortfolioSwitch, AI_CATEGORIES } from "../src/portfolioSwitch/script";
import { usePortfolioZoom } from "../src/portfolioZoom/script";

usePortfolioSwitch(AI_CATEGORIES);
usePortfolioZoom();
useParallaxingPhotos();