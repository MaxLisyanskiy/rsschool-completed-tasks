import { generateBody } from './generate-body.js'
import { generateInfoPopup } from './popup/info-popup.js'
import { controlsEvents } from './events/controls-events.js'
import { gameEvents } from './events/game-events.js';
import { popupEvents } from './events/popup-events.js';

document.addEventListener('DOMContentLoaded', function () {
    const themeСolor = localStorage.getItem('themeСolor') ?? 'light';
    const level = localStorage.getItem('level') ?? 'easy';
    const bombsCount = localStorage.getItem('bombsCount') ?? 10;
    const flagsCount = localStorage.getItem('flagsCount') ?? 10;
    const clicksCount = localStorage.getItem('clicksCount') ?? 0;

    generateBody(themeСolor, level, bombsCount, flagsCount, clicksCount);
    generateInfoPopup();
    controlsEvents();
    popupEvents();

    gameEvents()
});