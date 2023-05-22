export function searchBombs(indexesBombs, id, level) {
    let nearCells = [];
    let bombsCount = 0;

    const rowCount = level === 'easy' ? 10 : level === 'medium' ? 15 : 25;
    const count = id - rowCount;

    if ( id === 1 || (id - 1) % rowCount === 0 ) {
		for (let i = count; i < count + 2; i++) {
			nearCells.push(i);
		}
    } else if ( id % rowCount == 0 ) {
		for (let i = count - 1; i < count + 1; i++) {
			nearCells.push(i);
		}
    } else {
		for (let x = id - rowCount - 1; x < id - rowCount + 2; x++) {
			nearCells.push(x);
		}
    }

    nearCells.forEach(index => {
        nearCells.push(index + rowCount);
        nearCells.push(rowCount * 2 + index);
    });

    nearCells.forEach( index => {
      	if (indexesBombs.includes(index)) bombsCount++
    })

    return bombsCount;
}