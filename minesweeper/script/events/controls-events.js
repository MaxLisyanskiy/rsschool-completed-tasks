export function controlsEvents() {
    const body = document.querySelector('body');
  
    //theme
    const themeElement = document.querySelector('#theme');

    themeElement.addEventListener('click', () => {
      const themeColor = body.className;

      localStorage.setItem('_themeСolor', themeColor === 'light' ? 'dark' : 'light');
      body.className = themeColor === 'light' ? 'dark' : 'light'
      themeElement.src = themeColor === 'light' ? './assets/icon-light.png' : './assets/icon-dark.png'
    });
  
    //infoBtn
    const info = document.querySelector('#infoBtn');
    const infoPopup = document.querySelector('#infoPopup');
    info.addEventListener('click', () => {
      infoPopup.classList.add('show');
      body.classList.add('hidden')
    });
  
    //additionBtn
    const additionBtn = document.querySelector('#additionBtn');
    const addition = document.querySelector('#addition');
    additionBtn.addEventListener('click', () => {
      if(addition.classList.contains('show')) {
        addition.classList.remove('show');
      } else {
        addition.classList.add('show');
      }
  
    });
}