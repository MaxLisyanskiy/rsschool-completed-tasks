export function createHeadElement() {
    const head = document.createElement('div');
          head.classList.add('head');

    const img = document.createElement('img');
          img.setAttribute('id', 'theme');
          img.setAttribute('src', './assets/icon-dark.png');
          img.setAttribute('alt', 'icon-dark');

    const h1 = document.createElement('h1');
          h1.setAttribute('class', 'head__title');
          h1.innerText = 'Minesweeper'

    const sound = document.createElement('img');
          sound.setAttribute('id', 'sound');
          sound.setAttribute('src', './assets/sound-on.png');
          sound.setAttribute('alt', 'sound-on');

    head.appendChild(img);
    head.appendChild(h1);
    head.appendChild(sound);

    return head
}