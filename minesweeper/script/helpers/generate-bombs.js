export function generateBombs(totalCellCount, bombsCount) {
    let bombsArr = [];

    for (let i = 0; i < bombsCount; i++) {
        const id = Math.floor(Math.random() * (totalCellCount - 1) + 1);

        if (!bombsArr.includes(id)) bombsArr.push(id);
    }

    localStorage.setItem('_indexesBombs', JSON.stringify(bombsArr));

    return bombsArr
}