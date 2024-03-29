import { createHeadElement } from './elements/head.js'
import { createValuesElement } from './elements/values.js'
import { createControlsElement } from './elements/controls.js'
import { createAdditionElement } from './elements/addition.js'
import { createFieldElement } from './elements/field.js'
import { createSoundsElement } from './elements/sounds.js'

export function generateBody(sThemeСolor, sSoundState, sLevel, sTotalCellCount, sBombsCount, sFlagsCount, sClicksCount, sFieldState) {
    const body = document.querySelector('body')
    body.classList.add(sThemeСolor);

    const main = document.createElement('main');
    main.classList.add('container');

    const head = createHeadElement(sThemeСolor, sSoundState);

    const minesweeper = document.createElement('div');
    minesweeper.classList.add('minesweeper');

    const values = createValuesElement(sFlagsCount, sClicksCount)
    const controls = createControlsElement()
    const addition = createAdditionElement(sLevel, sBombsCount)
    const field = createFieldElement(sLevel, sTotalCellCount, sFieldState)

    minesweeper.append(values)
    minesweeper.append(controls)
    minesweeper.append(addition)
    minesweeper.append(field)

    main.append(head);
    main.append(minesweeper);
    main.append(minesweeper);

    body.prepend(main);

    createSoundsElement()
}