import { generateBody } from './generate-body.js';
import { generateInfoPopup } from './popup/info-popup.js'
import { generateBompPopup } from './popup/bomb-popup.js';

import { controlsEvents } from './events/controls-events.js'
import { gameEvents } from './events/game-events.js';
import { popupEvents } from './events/popup-events.js';

document.addEventListener('DOMContentLoaded', function () {
    const sThemeСolor = localStorage.getItem('_themeСolor') ?? 'light';

    const sLevel = localStorage.getItem('_level') ?? 'easy';
    const sTotalCellCount = localStorage.getItem('_totalCellCount') ?? 100;
    const sBombsCount = localStorage.getItem('_bombsCount') ?? 10;
    const sFlagsCount = localStorage.getItem('_flagsCount') ?? 10;
    const sClicksCount = localStorage.getItem('_clicksCount') ?? 0;

    generateBody(sThemeСolor, sLevel, sTotalCellCount, sBombsCount, sFlagsCount, sClicksCount);
    generateInfoPopup();
    generateBompPopup();

    controlsEvents();
    popupEvents();

    gameEvents(sThemeСolor, sLevel, sTotalCellCount, sBombsCount, sFlagsCount, sClicksCount)
});