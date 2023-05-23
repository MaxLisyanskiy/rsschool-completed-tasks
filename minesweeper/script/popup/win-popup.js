export function generateWinPopup() {
    const body = document.querySelector('body')

    const winPopup = document.createElement('div');
    winPopup.setAttribute('id', 'winPopup');
    winPopup.setAttribute('class', 'popup');
    
    winPopup.insertAdjacentHTML('beforeend',
        `
            <div class="popup__content">
                <button id="winPopupClose" class="popup__close"><span>x</span></button>
                <div class="win-popup">
                    <img src="./assets/win.png" alt="win">
                    <p>🤩 Congratulations! You win! 🤩</p>
                </div>
            </div>
        `
    );

    body.append(winPopup);
}