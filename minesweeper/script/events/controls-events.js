export function controlsEvents() {
    const body = document.querySelector('body');
  
    //theme
    const theme = document.querySelector('#theme');
    theme.addEventListener('click', () => {
      const themeValue = localStorage.getItem('themeСolor');

      localStorage.setItem('themeСolor', themeValue === 'light' ? 'dark' : 'light');

      document.body.className = themeValue === 'light' ? 'dark' : 'light'
      theme.src = themeValue === 'light' ? './assets/icon-light.png' : './assets/icon-dark.png'
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