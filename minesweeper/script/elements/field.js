export function createFieldElement(sLevel, sTotalCellCount, fieldState) {
    const fieldWrapp = document.createElement('div');
          fieldWrapp.setAttribute('class', `field ${sLevel}`);


    const flag = '🚩'
    const bomb = '💣'

    if (fieldState) {
        fieldState.forEach( obj => {})
    } else {
        for (let i = 0; i < sTotalCellCount; i++) {
            const cell = createNewCellElement(i)
            fieldWrapp.append(cell)
        }
    }
        
    return fieldWrapp
}

export function createNewCellElement(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = index;

    return cell;
}