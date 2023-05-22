export function controlsEvents() {
    const body = document.querySelector('body');
  
    //theme
    const themeElement = document.querySelector('#theme');

    themeElement.addEventListener('click', () => {
		  const switchSound = document.getElementById('switchSound');
      const themeColor = body.className;

      switchSound.play()

      localStorage.setItem('_themeСolor', themeColor === 'light' ? 'dark' : 'light');
      body.className = themeColor === 'light' ? 'dark' : 'light'
      themeElement.src = themeColor === 'light' ? './assets/icon-light.png' : './assets/icon-dark.png'
    });
  
    //infoBtn
    const infoBtn = document.querySelector('#infoBtn');
    const infoPopup = document.querySelector('#infoPopup');
    infoBtn.addEventListener('click', () => {
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

    //resultBtn
    const resultBtn = document.querySelector('#resultBtn');
    const resultPopup = document.querySelector('#resultPopup');
    const resultPopupContent = document.querySelector('#resultPopupContent');
    const resultPopupClose = document.querySelector('#resultPopupClose');

    resultBtn.addEventListener('click', () => {
      const resultState = localStorage.getItem('_resultState')

      if(resultState) {
        const ul = document.createElement('ul');
              ul.setAttribute('class', 'result-popup__list');
        JSON.parse(resultState).forEach(obj => {
          const li = document.createElement('li');
          li.innerHTML = `
            <h3 class="${obj.result}">${obj.result}</h3>
            <h4>${obj.date}</h4>
            <div class="result-popup__values">
              <span>🎚️: ${obj.level}</span>
              <span>⏱️: ${obj.time}</span>
              <span>🖱️: ${obj.clicksCount}</span>
            </div>
          `
          ul.append(li)
        })
        resultPopupContent.append(ul)
      } else {
        resultPopupContent.innerHTML = `
          <div class="result-popup__empty">
            <img src="./assets/empty-list.png" alt="empty-list">  
            <h3>Hmmm... result list is empty!</h3>
          </div>
        `
      }
      resultPopup.classList.add('show');

    });

    resultPopupClose.addEventListener('click', () => {
      resultPopup.classList.remove('show');
      resultPopupContent.innerHTML = ''
    });
}