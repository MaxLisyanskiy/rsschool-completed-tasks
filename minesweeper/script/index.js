import { generateBody } from './generate-body.js'
import { generateInfoPopup } from './popup/info-popup.js'
import { controlsEvents } from './events/controls-events.js'
import { gameEvents } from './events/game-events.js';
import { popupEvents } from './events/popup-events.js';

document.addEventListener('DOMContentLoaded', function () {
    const themeСolor = localStorage.getItem('themeСolor');
    const level = localStorage.getItem('level');
    const bombsCount = localStorage.getItem('bombsCount');
    const flagsCount = localStorage.getItem('flagsCount');
    const clicksCount = localStorage.getItem('clicksCount');

    generateBody(themeСolor, level, bombsCount, flagsCount, clicksCount);
    generateInfoPopup();
    controlsEvents();
    popupEvents();

    gameEvents()
});