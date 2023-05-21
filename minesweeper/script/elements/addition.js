export function createAdditionElement() {
    const additionWrapp = document.createElement('div');
          additionWrapp.classList.add('addition');

    additionWrapp.insertAdjacentHTML('beforeend',
        `
            <div class="addition-level">
                <span>Level:</span>
                <select name="select">
                    <option value="easy">Easy</option>
                    <option value="medium" selected>Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div class="addition-count">
                <span>Count of bombs:</span>
                <div class="addition-count__wrapp">
                    <input type="number" value="10">
                    <button>✔</button>
                </div>
            </div>
            <button class="addition__result">Check results</button>
        `
    );

    return additionWrapp
}