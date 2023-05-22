export function popupEvents() {
    const body = document.querySelector('body');

    //infoPopup
    const infoPopup = document.querySelector('#infoPopup');
    const infoPopupClose = document.querySelector('#infoPopupClose');
    infoPopupClose.addEventListener('click', () => {
        infoPopup.classList.remove('show')
        body.classList.remove('hidden')
    });

    //infoPopup
    const bombPopup = document.querySelector('#bombPopup');
    const bombPopupClose = document.querySelector('#bombPopupClose');
    bombPopupClose.addEventListener('click', () => {
        bombPopup.classList.remove('show')
        body.classList.remove('hidden')
    });
}