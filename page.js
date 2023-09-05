import { useCursor } from "./src/cursor/script";
import { useBurgerMenu } from "./src/burger/script";
import { useContentBlock } from "./src/common";

import './src/styles/common.scss';
import './src/styles/page.scss';

useContentBlock();
useBurgerMenu();
useCursor();