export function generateResultPopup() {
    const body = document.querySelector('body')

    const resultPopup = document.createElement('div');
    resultPopup.setAttribute('id', 'resultPopup');
    resultPopup.setAttribute('class', 'popup');
    
    resultPopup.insertAdjacentHTML('beforeend',
        `
            <div class="popup__content">
                <button id="resultPopupClose" class="popup__close"><span>x</span></button>
                <div id="resultPopupContent" class="result-popup"></div>
            </div>
        `
    );

    body.append(resultPopup);
}