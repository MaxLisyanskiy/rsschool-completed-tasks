export function addCellBomb(id) {
    const cell = document.getElementById(id);
    cell.classList.add('bombed')
    cell.innerHTML = `<span>💣</span>`
}