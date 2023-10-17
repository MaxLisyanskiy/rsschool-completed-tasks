export function createSoundsElement() {
    const body = document.querySelector('body')

    const clickSound = document.createElement('audio');
          clickSound.id = "clickSound"
          clickSound.src = './assets/sound/clickSound.mp3';

    const flagSound = document.createElement('audio');
          flagSound.id = "flagSound"
          flagSound.src = './assets/sound/flagSound.mp3';

    const switchSound = document.createElement('audio');
          switchSound.id = "switchSound"
          switchSound.src = './assets/sound/switchSound.mp3';

    const gameOverSound = document.createElement('audio');
          gameOverSound.id = "gameOverSound"
          gameOverSound.src = './assets/sound/gameOverSound.mp3';

    const winGameSound = document.createElement('audio');
          winGameSound.id = "winGameSound"
          winGameSound.src = './assets/sound/winGameSound.mp3';

    body.append(clickSound);
    body.append(flagSound);
    body.append(switchSound);
    body.append(gameOverSound);
    body.append(winGameSound);
}