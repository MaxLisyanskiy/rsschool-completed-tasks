export function createControlsElement() {
    const controlsWrapp = document.createElement('div');
          controlsWrapp.classList.add('controls');

    controlsWrapp.insertAdjacentHTML('beforeend',
        `
            <button class="controls-menu">
                <img src="./assets/menu.png" alt="menu">
            </button>
            <button>
                <img src="./assets/cat-first.png" alt="cat">
            </button>
            <button class="controls-question">
                <img src="./assets/question.png" alt="question">
            </button>
        `
    );

    return controlsWrapp
}