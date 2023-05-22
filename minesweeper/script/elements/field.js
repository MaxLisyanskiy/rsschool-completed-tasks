export function createFieldElement(fieldState, count = 100) {
    const fieldWrapp = document.createElement('div');
          fieldWrapp.classList.add('field');

    const flag = '🚩'
    const bomb = '💣'

    if (fieldState) {
        fieldState.forEach( obj => {})
    } else {
        for (let i = 0; i < count; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            fieldWrapp.append(cell)
        }
    }
        
    return fieldWrapp
}