export function createAdditionElement(level, bombsCount) {
    const additionWrapp = document.createElement('div');
          additionWrapp.setAttribute('id', 'addition');
          additionWrapp.setAttribute('class', 'addition');
console.log(level);
    additionWrapp.insertAdjacentHTML('beforeend',
        `
            <div class="addition-level">
                <span>Level:</span>
                <select id="additionLevel" name="select">
                    <option value="easy" ${(level === 'easy' || level === null) ? 'selected' : ''}>Easy</option>
                    <option value="medium" ${level === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="hard" ${level === 'hard' ? 'selected' : ''}>Hard</option>
                </select>
            </div>
            <div class="addition-count">
                <span>Count of bombs:</span>
                <div class="addition-count__wrapp">
                    <input id="additionBombsInput" type="number" value="${bombsCount ?? 10}" min="1" max="99">
                    <button id="additionBombsBtn">✔</button>
                </div>
            </div>
            <button class="addition__result">Check results</button>
        `
    );

    return additionWrapp
}