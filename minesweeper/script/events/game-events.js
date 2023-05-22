import { createNewCellElement } from "../elements/field.js";
import { addCellNumber } from "../helpers/add-cell-number.js";
import { addCellBomb } from "../helpers/add-cell-bomb.js";
import { generateBombs } from "../helpers/generate-bombs.js";
import { saveFieldState } from "../helpers/save-field-state.js";
import { searchBombs } from "../helpers/search-bombs.js";

export function gameEvents(sThemeСolor, sLevel, sTotalCellCount, sBombsCount, sFlagsCount, sClicksCount) {
	let time = 0;
	let level = sLevel;
	let totalCellCount = sTotalCellCount;
	let interval = 0;
	let bombsCount = sBombsCount;
	let indexesBombs = []
	let flagsCount = sFlagsCount;
	let clicksCount = 0;
	let gameOver = false;

    const field = document.querySelector('.field');
    const catBtn = document.querySelector('#catBtn');
    
	function changeLevelOrCountBombs(value) {
		const flags = document.querySelector('#flags');
		const additionBombsInput = document.querySelector('#additionBombsInput');

		clearInterval(interval);

		bombsCount = value;
		flagsCount = value;
		localStorage.setItem('_bombsCount', value);
		localStorage.setItem('_flagsCount', value);

		flags.innerText = flagsCount;
		additionBombsInput.value = bombsCount;
	}

	function handleClick() {
		const clicks = document.querySelector('#clicks');
		const clickSound = document.getElementById('clickSound');

		clickSound.play();

		clicksCount++;
		clicks.innerText = clicksCount;
		localStorage.setItem('_clicksCount', clicksCount);
	}

	function handleToggleFlag(action) {
		const flags = document.querySelector('#flags');
		const flagSound = document.getElementById('flagSound')

		flagSound.play()

		if(action === 'add') {
			flagsCount--;
			flags.innerText = flagsCount;
			localStorage.setItem('_flagsCount', flagsCount);
		} else {
			flagsCount++;
			flags.innerText = flagsCount;
			localStorage.setItem('_flagsCount', flagsCount);
		}
	}

	function handleStartInterval() {
		const timer = document.querySelector('#timer');

		time = 1;
		timer.innerText = 1;
		interval = setInterval(() => {
			time++;
			timer.innerText = time;
			localStorage.setItem('_timer', time);
		}, 1000);
	}

	function clearStorage() {
		localStorage.removeItem('_indexesBombs');
		localStorage.removeItem('_flagsCount');
		localStorage.removeItem('_clicksCount');
		localStorage.removeItem('_timer');
		localStorage.removeItem('_fieldState');
	}

	function createField() {
		field.innerHTML = '';
		field.setAttribute('class', `field ${level}`);

		for (let i = 1; i <= totalCellCount; i++) {
			const cell = createNewCellElement(i);
			field.append(cell)
		}
	}

	function handleOpenCell(id) {
		const item = document.getElementById(id)
		item.classList.add('clicked')

		const gameOverSound = document.getElementById('gameOverSound');

		const nearBombsCount = searchBombs(indexesBombs, id, level)

		if (indexesBombs.includes(id)) {
			if (gameOver) {
				addCellBomb(id)
			} else {
				clearInterval(interval);
				gameOver = true;
				addCellBomb(id)
				gameOverSound.play()
				clearStorage();

				const catImg = document.querySelector('#catImg');
				catImg.src = "./assets/cat-bad.png"


				const cells = document.querySelectorAll('.cell');
				cells.forEach((cell) => handleOpenCell(Number(cell.id)));

				const bombPopup = document.querySelector('#bombPopup');
				setTimeout(() => {
					bombPopup.classList.add('show')
				}, 800)
			}
		} else if (nearBombsCount > 0){
			addCellNumber(id, nearBombsCount)
		} else {
			
		}

	}
	
	function restartGame() {
		clearStorage()
		catImg.src = "./assets/cat-first.png"
		createField()
		gameOver = false;
		const timer = document.getElementById('timer')
		const clicks = document.getElementById('clicks')
		const flags = document.getElementById('flags')
		time = 0;
		flagsCount = bombsCount;
		clicksCount = 0

		timer.innerText = 0;
		clicks.innerText = 0;
		flags.innerText = flagsCount;
	}

	field.addEventListener('click', (event) => {
		const item = event.target
		
		if(item.classList.contains('cell') && !item.classList.contains('clicked') && !item.classList.contains('flaged')) {
			if (localStorage.getItem('_fieldState')) {
				handleClick()
				handleOpenCell(Number(item.id))
			} else {
				handleStartInterval()
				handleClick()
				indexesBombs = generateBombs(Number(event.target.id), totalCellCount, bombsCount);
				handleOpenCell(Number(item.id))
				const catImg = document.querySelector('#catImg');
				catImg.src = "./assets/cat-good.png"
				saveFieldState()

			}
		}
    });

	field.addEventListener('contextmenu', (event) => {
		event.preventDefault();

		const item = document.getElementById(event.target.id)

		if (item.classList.contains('cell') && !item.classList.contains('clicked')) {
			if(flagsCount > 0 || item.classList.contains('flaged')) {
				if (item.classList.contains('flaged')) {
					item.classList.remove('flaged')
					item.innerHTML = '';
					handleToggleFlag('remove')
				} else {
					item.classList.add('flaged')
					item.innerHTML = `<span id="${item.id}">🚩</span>`;
					handleToggleFlag('add')
				}
			}
		}
	});

	catBtn.addEventListener('click', () => {
		restartGame()
    });

	//additionLevel
	const additionLevel = document.querySelector('#additionLevel');
	additionLevel.addEventListener('change', (event) => {
		const value = event.target.value
		const count = value === 'easy' ? 10 : value === 'medium' ? 15 : 25;

		localStorage.setItem('_level', value);
		localStorage.setItem('_totalCellCount', count * count);
		level = value;
		totalCellCount = count * count;
		changeLevelOrCountBombs(count)
		createField()
	});

	//additionCountBombs
	const additionBombsBtn = document.querySelector('#additionBombsBtn');
	const additionBombsInput = document.querySelector('#additionBombsInput');
	additionBombsBtn.addEventListener('click', () => {
		changeLevelOrCountBombs(additionBombsInput.value)
	});
}