import { generateBody } from './generate-body.js';
import { generateInfoPopup } from './popup/info-popup.js'
import { generateBompPopup } from './popup/bomb-popup.js';
import { generateResultPopup } from './popup/result-popup.js';

import { controlsEvents } from './events/controls-events.js'
import { gameEvents } from './events/game-events.js';
import { popupEvents } from './events/popup-events.js';

document.addEventListener('DOMContentLoaded', function () {
    const sThemeСolor = localStorage.getItem('_themeСolor') ?? 'light';
    const sSoundState = localStorage.getItem('_soundState') ?? 'on';

    const sLevel = localStorage.getItem('_level') ?? 'easy';
    const sTotalCellCount = localStorage.getItem('_totalCellCount') ?? 100;
    const sBombsCount = localStorage.getItem('_bombsCount') ?? 10;
    const sFlagsCount = localStorage.getItem('_flagsCount') ?? sBombsCount;
    const sClicksCount = localStorage.getItem('_clicksCount') ?? 0;
    const sTimer = localStorage.getItem('_timer') ?? 0;
    const sFieldState = localStorage.getItem('_fieldState');

    generateBody(sThemeСolor, sSoundState, sLevel, sTotalCellCount, sBombsCount, sFlagsCount, sClicksCount, sFieldState);
    generateInfoPopup();
    generateBompPopup();
    generateResultPopup();

    controlsEvents();
    popupEvents();

    gameEvents(sLevel, sTotalCellCount, sBombsCount, sFlagsCount, sClicksCount, sTimer)
});