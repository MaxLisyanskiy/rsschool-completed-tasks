export function generateBompPopup() {
    const body = document.querySelector('body')

    const boomPopup = document.createElement('div');
    boomPopup.setAttribute('id', 'bombPopup');
    boomPopup.setAttribute('class', 'popup');
    
    boomPopup.insertAdjacentHTML('beforeend',
        `
            <div class="popup__content">
                <button id="bombPopupClose" class="popup__close"><span>x</span></button>
                <div class="bomp-popup">
                    <img src="./assets/boom.png" alt="boom">
                    <p>💀 Game over. Try again! 💀</p>
                </div>
            </div>
        `
    );

    body.append(boomPopup);
}