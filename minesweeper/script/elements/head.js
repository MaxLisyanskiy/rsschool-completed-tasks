export function createHeadElement(sThemeСolor, sSoundState) {
    const head = document.createElement('div');
          head.classList.add('head');

    const img = document.createElement('img');
          img.setAttribute('id', 'theme');
          img.setAttribute('src', sThemeСolor === 'light' ? './assets/icon-dark.png' : './assets/icon-light.png');
          img.setAttribute('alt', 'icon-theme');
      
	const h1 = document.createElement('h1');
          h1.setAttribute('class', 'head__title');
          h1.innerText = 'Minesweeper'

    const sound = document.createElement('img');
          sound.setAttribute('id', 'sound');
          sound.setAttribute('src', sSoundState === 'on' ? './assets/sound-on.png' : './assets/sound-off.png');
          sound.setAttribute('alt', 'icon-sound');

    head.append(img);
    head.append(h1);
    head.append(sound);

    return head
}