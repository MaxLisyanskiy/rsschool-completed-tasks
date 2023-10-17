export function popupEvents() {
    const body = document.querySelector('body');

    //infoPopup
    const infoPopup = document.querySelector('#infoPopup');
    const infoPopupClose = document.querySelector('#infoPopupClose');
    infoPopupClose.addEventListener('click', () => {
        infoPopup.classList.remove('show')
        body.classList.remove('hidden')
    });

    //bombPopup
    const bombPopup = document.querySelector('#bombPopup');
    const bombPopupClose = document.querySelector('#bombPopupClose');
    bombPopupClose.addEventListener('click', () => {
        bombPopup.classList.remove('show')
        body.classList.remove('hidden')
    });

    //winPopup
    const winPopup = document.querySelector('#winPopup');
    const winPopupClose = document.querySelector('#winPopupClose');
    winPopupClose.addEventListener('click', () => {
        winPopup.classList.remove('show')
        body.classList.remove('hidden')
    });
}