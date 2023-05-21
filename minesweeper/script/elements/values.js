export function createValuesElement() {
    const valuesWrapp = document.createElement('div');
          valuesWrapp.classList.add('values');

    valuesWrapp.insertAdjacentHTML('beforeend',
        `
            <div class="values__item">
                <span>0</span>
                <img src="./assets/flag.png" alt="flag">
            </div>
            <div class="values__item">
                <span>0</span>
                <img src="./assets/timer.png" alt="timer">
            </div>
            <div class="values__item">
                <span>0</span>
                <img src="./assets/click.png" alt="click">
            </div>
        `
    );

    return valuesWrapp
}