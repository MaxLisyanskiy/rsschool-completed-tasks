export function createFieldElement(sLevel, sTotalCellCount, sFieldState) {
    const fieldWrapp = document.createElement('div');
          fieldWrapp.setAttribute('class', `field ${sLevel}`);

    if (sFieldState) {
        JSON.parse(sFieldState).forEach( obj => {
            const cell = document.createElement('div');
            cell.setAttribute('id', obj.id);
            cell.setAttribute('class', obj.class);
            cell.innerHTML = obj.span
            fieldWrapp.append(cell)
        })
    } else {
        for (let i = 1; i <= sTotalCellCount; i++) {
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