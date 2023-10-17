export function generateBombs(id, totalCellCount, bombsCount) {
    let bombsArr = [];

    while (bombsArr.length < bombsCount) {
        const randomId = Math.floor(Math.random() * (totalCellCount - 1) + 1);

        if (!bombsArr.includes(randomId) && randomId !== id) {
            bombsArr.push(randomId);
        }
    }

    localStorage.setItem('_indexesBombs', JSON.stringify(bombsArr));

    return bombsArr
}