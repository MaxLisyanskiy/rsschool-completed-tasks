export function createAdditionElement(sLevel, sBombsCount) {
    const additionWrapp = document.createElement('div');
          additionWrapp.setAttribute('id', 'addition');
          additionWrapp.setAttribute('class', 'addition');

    additionWrapp.insertAdjacentHTML('beforeend',
        `
            <div class="addition-level">
                <span>Level:</span>
                <select id="additionLevel" name="select">
                    <option value="easy" ${sLevel === 'easy' ? 'selected' : ''}>Easy</option>
                    <option value="medium" ${sLevel === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="hard" ${sLevel === 'hard' ? 'selected' : ''}>Hard</option>
                </select>
            </div>
            <div class="addition-count">
                <span>Count of bombs:</span>
                <div class="addition-count__wrapp">
                    <input id="additionBombsInput" type="number" value="${sBombsCount}" min="1" max="99">
                    <button id="additionBombsBtn">✔</button>
                </div>
            </div>
            <button class="addition__result">Check results</button>
        `
    );

    return additionWrapp
}