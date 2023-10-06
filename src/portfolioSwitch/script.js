import { animate } from '../common';
import './style.scss';

export const AI_CATEGORIES = ['retails', 'exterior', 'interior', 'fashion', 'product'];
export const DAR_CATEGORIES = ['interior', 'exterior', 'product', 'modeling'];

export function usePortfolioSwitch() {
    const categories = [];

    const toggles = [...document.querySelectorAll('.portfolioswitchitem')].reduce((acc, toggle) => {
        const category = toggle.getAttribute('href').replace('#', '');
        acc[category] = toggle;
        categories.push(category);
        return acc;
    }, {});
    const blocks = [...document.querySelectorAll('.portfoliocategory')].reduce((acc, block) => {
        const category = block.dataset.portfolioCategory;
        acc[category] = block;
        return acc;
    }, {});

    let activeCategory = categories[0];
    let isSwitching = false;

    setInitialCategory();

    Object.entries(toggles).forEach(([category, toggle]) => {
        toggle.addEventListener('click', () => !isSwitching && changeCategory(category));
    });

    function changeCategory(category) {
        changeSwitch(category);
        changeBlock(category);
    }

    function changeBlock(category) {
        isSwitching = true;
        animate(blocks[activeCategory], { addClass: 'fading' })
            .then((block) => {
                block.classList.add('hidden');
                blocks[category].classList.remove('preparing');
                block.classList.remove('fading');
                activeCategory = category;
                isSwitching = false;
            });
        blocks[category].classList.add('preparing');
        blocks[category].classList.remove('hidden');
    }

    function changeSwitch(category) {
        toggles[activeCategory].classList.remove('active');
        toggles[category].classList.add('active');
    }

    function setInitialCategory() {
        const { hash } = window.location;
        if (!hash) {
            return;
        }
        const hashCategory = hash.replace('#', '');
        const category = categories.find((cat) => cat === hashCategory);
        if (activeCategory !== category) {
            changeCategory(category ?? categories[0]);
        }
    }
};
