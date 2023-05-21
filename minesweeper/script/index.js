// import './events.js'
import { generateBody } from './generate-body.js'
import { events } from './events.js'

document.addEventListener('DOMContentLoaded', function () {
    const themeСolor = localStorage.getItem('themeСolor');

    generateBody(themeСolor);
    events();
});