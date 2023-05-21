import { generateBody } from './generate-body.js'
import { generateInfoPopup } from './popup/info-popup.js'
import { events } from './events.js'
import { popupEvents } from './events/popup-events.js';

document.addEventListener('DOMContentLoaded', function () {
    const themeСolor = localStorage.getItem('themeСolor');

    generateBody(themeСolor);
    generateInfoPopup();
    events();
    popupEvents();
});