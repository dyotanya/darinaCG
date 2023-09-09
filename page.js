import { useCursor } from "./src/cursor/script";
import { useBurgerMenu } from "./src/burger/script";
import { useContentBlock, setScrollbarWidth } from "./src/common";
import { useNavbar } from "./src/navbar/script";

import './src/styles/common.scss';
import './src/styles/page.scss';

useNavbar();
useContentBlock();
setScrollbarWidth();
useBurgerMenu();
useCursor();