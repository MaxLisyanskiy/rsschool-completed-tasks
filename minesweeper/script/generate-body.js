import { createHeadElement } from './elements/head.js'
import { createValuesElement } from './elements/values.js'
import { createControlsElement } from './elements/controls.js'
import { createAdditionElement } from './elements/addition.js'
import { createFieldElement } from './elements/field.js'

export function generateBody(themeСolor, level, bombsCount, flagsCount, clicksCount) {
    const body = document.querySelector('body')
    body.classList.add(themeСolor ?? 'light');

    const main = document.createElement('main');
    main.classList.add('container');

    const head = createHeadElement(themeСolor);

    const minesweeper = document.createElement('div');
    minesweeper.classList.add('minesweeper');

    const values = createValuesElement(flagsCount, clicksCount)
    const controls = createControlsElement()
    const addition = createAdditionElement(level, bombsCount)
    const field = createFieldElement()

    minesweeper.append(values)
    minesweeper.append(controls)
    minesweeper.append(addition)
    minesweeper.append(field)

    main.append(head);
    main.append(minesweeper);

    body.prepend(main);
}