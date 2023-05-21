export function generateInfoPopup() {
    const body = document.querySelector('body')

    const infoPopup = document.createElement('div');
    infoPopup.setAttribute('id', 'infoPopup');
    infoPopup.setAttribute('class', 'popup');
    
    infoPopup.insertAdjacentHTML('beforeend',
        `
            <div class="popup__content">
                <button id="infoPopupClose" class="popup__close"><span>x</span></button>
                <div class="info">
                    <div class="info-flag">
                        <img src="./assets/flag.png" alt="flag">
                        <p>Нажмите правую кнопку мыши на ячейке, чтобы разместить флаг</p>
                    </div>
                    <div class="info-field">
                        <div class="info-field__cell">
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                        </div>
                        <p>Обычное нажатие, чтобы раскопать участок</p>
                    </div>
                    <div class="info-cat">
                        <img src="./assets/cat-first.png" alt="cat-first">
                        <p>Нажмите на котика, чтобы начать игру занаво</p>
                    </div>
                </div>
            </div>
        `
    );

    body.append(infoPopup);
}