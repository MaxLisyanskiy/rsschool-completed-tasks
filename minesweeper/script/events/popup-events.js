export function popupEvents() {

    //infoPopup
    const infoPopup = document.querySelector('#infoPopup');
    const infoPopupClose = document.querySelector('#infoPopupClose');
    infoPopupClose.addEventListener('click', () => infoPopup.classList.remove('show'));
}