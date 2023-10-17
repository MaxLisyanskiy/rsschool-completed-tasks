export function addCellNumber(id, nearBombsCount) {
    const cell = document.getElementById(id);

    const classNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

    cell.classList.add(classNames[nearBombsCount - 1])
    cell.innerHTML = `<span>${nearBombsCount}</span>`
}