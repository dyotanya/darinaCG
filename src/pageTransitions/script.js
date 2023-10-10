import Swup from 'swup';
import { pageLoadEvent, pageReadyEvent } from '../common';

import './style.scss';

export const swup = new Swup();

swup.hooks.on("visit:end", () => {
    window.dispatchEvent(pageLoadEvent);
    window.dispatchEvent(pageReadyEvent);
});