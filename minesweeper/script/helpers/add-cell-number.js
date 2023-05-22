export function addCellNumber(id, nearBombsCount) {
    const cell = document.getElementById(id);
    cell.classList.add(nearBombsCount === 1 ? 'one' : nearBombsCount === 2 ? 'two' : 'three')
    cell.innerHTML = `<span>${nearBombsCount}</span>`
}