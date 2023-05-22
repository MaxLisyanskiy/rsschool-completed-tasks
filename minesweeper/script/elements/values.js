export function createValuesElement(flagsCount, clicksCount) {
    const valuesWrapp = document.createElement('div');
          valuesWrapp.classList.add('values');

    valuesWrapp.insertAdjacentHTML('beforeend',
        `
            <div class="values__item">
                <span id="flags">${flagsCount}</span>
                <img src="./assets/flag.png" alt="flag">
            </div>
            <div class="values__item">
                <span id="timer">0</span>
                <img src="./assets/timer.png" alt="timer">
            </div>
            <div class="values__item">
                <span id="clicks">${clicksCount}</span>
                <img src="./assets/click.png" alt="click">
            </div>
        `
    );

    return valuesWrapp
}