const theme = document.querySelector('#theme')

theme.addEventListener('click', () => {
    const themeValue = localStorage.getItem('theme');

    localStorage.setItem('theme', themeValue === 'light' ? 'dark' : 'light');

    changeTheme();
});

export function changeTheme() {
    const themeValue = localStorage.getItem('theme');

    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    }

    document.body.className = themeValue === 'light' ? 'dark' : 'light'
    theme.src = themeValue === 'light' ? './assets/icon-light.png' : './assets/icon-dark.png'
}
  