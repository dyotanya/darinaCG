import { useCursor } from "./src/cursor/script";
import { useContentBlock, setScrollBarWidthListener } from "./src/common";
import { useNavbar } from "./src/navbar/script";
import { usePopups } from "./src/popups/script";

import './src/styles/common.scss';
import './src/styles/page.scss';

useNavbar();
useContentBlock();
setScrollBarWidthListener();
usePopups();
useCursor();