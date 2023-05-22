export function createHeadElement(sThemeСolor) {
    const head = document.createElement('div');
          head.classList.add('head');
      
	const h1 = document.createElement('h1');
          h1.setAttribute('class', 'head__title');
          h1.innerText = 'Minesweeper'

	const img = document.createElement('img');
          img.setAttribute('id', 'theme');
          img.setAttribute('src', sThemeСolor === 'light' ? './assets/icon-dark.png' : './assets/icon-light.png');
          img.setAttribute('alt', 'icon-theme');

    head.append(h1);
    head.append(img);

    return head
}