import { createNewCellElement } from "../elements/field.js";
import { addCellNumber } from "../helpers/add-cell-number.js";
import { addCellBomb } from "../helpers/add-cell-bomb.js";
import { generateBombs } from "../helpers/generate-bombs.js";
import { saveFieldState } from "../helpers/save-field-state.js";
import { searchBombs } from "../helpers/search-bombs.js";

export function gameEvents(sLevel, sTotalCellCount, sBombsCount, sFlagsCount, sClicksCount, sTimer) {
	let time = 0;
	let level = sLevel;
	let totalCellCount = sTotalCellCount;
	let interval = 0;
	let bombsCount = sBombsCount;
	let indexesBombs = []
	let flagsCount = sFlagsCount;
	let clicksCount = sClicksCount;
	let gameOver = false;

    const field = document.querySelector('.field');
    const catBtn = document.querySelector('#catBtn');

	if (Number(sTimer) > 0) {
		handleStartInterval(Number(sTimer))
	}
    
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
		const soundState = localStorage.getItem('_soundState') ?? 'on';

		if(soundState === 'on') clickSound.play();

		clicksCount++;
		clicks.innerText = clicksCount;
		localStorage.setItem('_clicksCount', clicksCount);
	}

	function handleToggleFlag(action) {
		const flags = document.querySelector('#flags');
		const flagSound = document.getElementById('flagSound')
		const soundState = localStorage.getItem('_soundState') ?? 'on';

		if(soundState === 'on') flagSound.play()

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

	function handleStartInterval(timerState) {
		const timer = document.querySelector('#timer');

		if(timerState) {
			time = timerState;
			timer.innerText = timerState;
		} else {
			time = 1;
			timer.innerText = 1;
		}

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

	function checkAllCellOpened() {
		const winGameSound = document.getElementById('winGameSound');
		const soundState = localStorage.getItem('_soundState') ?? 'on';

		const cells = document.querySelectorAll('.cell')
		let result = 0

		cells.forEach(i => {
			if(i.classList.contains('clicked')) {
				result++
			}
		})

		if(result === (totalCellCount - bombsCount)) {
			clearInterval(interval);
			gameOver = true;
			if(soundState === 'on') winGameSound.play()
			clearStorage();
			updateResult('Win')

			const catImg = document.querySelector('#catImg');
			catImg.src = "./assets/cat-win.png"

			const cells = document.querySelectorAll('.cell');
			cells.forEach((cell) => handleOpenCell(Number(cell.id)));

			const winPopup = document.querySelector('#winPopup');
			setTimeout(() => {
				winPopup.classList.add('show')
			}, 800)
		}
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

		if(item.classList.contains('clicked')) return false

		item.classList.add('clicked')

		const gameOverSound = document.getElementById('gameOverSound');
		const soundState = localStorage.getItem('_soundState') ?? 'on';

		const nearBombsCount = searchBombs(indexesBombs, id, level)

		if (indexesBombs.includes(id)) {
			if (gameOver) {
				addCellBomb(id)
			} else {
				clearInterval(interval);
				gameOver = true;
				addCellBomb(id)
				if(soundState === 'on') gameOverSound.play()
				clearStorage();
				updateResult('Lose')

				const catImg = document.querySelector('#catImg');
				catImg.src = "./assets/cat-bad.png"

				const cells = document.querySelectorAll('.cell');
				cells.forEach((cell) => handleOpenCell(Number(cell.id)));

				const bombPopup = document.querySelector('#bombPopup');
				setTimeout(() => {
					bombPopup.classList.add('show')
				}, 800)
			}
		} else {
			if(!gameOver) checkAllCellOpened()
			if (nearBombsCount > 0){
				addCellNumber(id, nearBombsCount)
			} else {
				const rowCount = level === 'easy' ? 10 : level === 'medium' ? 15 : 25;
	
				if (id === 1) {
					for (let y = 0; y < rowCount * 2; y += rowCount) {
						for (let x = id; x < id + 2; x++) {
							handleOpenEmptyCell(x + y);
						}
					}
				}
	
				else if (id > 1 && id < rowCount) {
					for (let y = 0; y < rowCount * 2; y += rowCount) {
						for (let x = id - 1; x < id + 2; x++) {
							handleOpenEmptyCell(x + y);
						}
					}
				}
	
				else if (id == rowCount) {
					for (let y = 0; y < rowCount * 2; y += rowCount) {
						for (let x = id - 1; x < id + 1; x++) {
							handleOpenEmptyCell(x + y);
						}
					}
				}
	
				else if (id > rowCount && (id - 1) % rowCount == 0 && id < rowCount * rowCount - rowCount) {
					for (let y = 0; y < rowCount * 3; y += rowCount) {
						for (let x = id - rowCount; x < id - rowCount + 2; x++) {
							handleOpenEmptyCell(x + y);
						}
					}
				}

				else if (id == rowCount * rowCount - rowCount + 1) {
					for (let y = 0; y < rowCount * 2; y += rowCount) {
						for (let x = id - rowCount; x < id - rowCount + 2; x++) {
							handleOpenEmptyCell(x + y);
						}
					}
				}

				else if (id > rowCount * rowCount - rowCount + 1 && id < rowCount * rowCount) {
					for (let y = 0; y < rowCount * 2; y += rowCount) {
						for (let x = id - rowCount - 1; x < id - rowCount + 2; x++) {
							handleOpenEmptyCell(x + y);
						}
					}
				}

				else if (id == rowCount * rowCount) {
					for (let y = 0; y < rowCount * 2; y += rowCount) {
						for (let x = id - rowCount - 1; x < id - rowCount + 1; x++) {
						handleOpenEmptyCell(x + y);
						}
					}
				}

				else if (id > rowCount && id % rowCount == 0 && id < rowCount * rowCount) {
					for (let y = 0; y < rowCount * 3; y += rowCount) {
						for (let x = id - rowCount - 1; x < id - rowCount + 1; x++) {
							handleOpenEmptyCell(x + y);
						}
					}
				}

				else if (id > rowCount + 1 && id < rowCount * rowCount - rowCount - 1) {
					for (let y = 0; y < rowCount * 3; y += rowCount) {
						for (let x = id - rowCount - 1; x < id - rowCount + 2; x++) {
							handleOpenEmptyCell(x + y);
						}
					}
				}
			}
		}

	}

	function handleOpenEmptyCell(id) {
		if (id > 0 && id <= totalCellCount) {
			const item = document.getElementById(id)

			const nearBombsCount = searchBombs(indexesBombs, id, level)

			if (nearBombsCount > 0) {
				item.classList.add('clicked')
				addCellNumber(id, nearBombsCount)
			} else if(indexesBombs.includes(id)) {
				return false
			} else {
				handleOpenCell(id);
			}

			checkAllCellOpened()
		}
	}
	
	function restartGame() {
		clearInterval(interval)
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

	function updateResult(result) {
		let resultState = localStorage.getItem('_resultState');

		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const currentTime = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
		const currentDate = `${day}-${month}-${year} ${currentTime}`;
		

		const obj = {
			date: currentDate,
			result,
			level,
			clicksCount,
			time
		}

		if (resultState) {
			resultState = JSON.parse(resultState)
		} else {
			resultState = []
		}

		resultState.unshift(obj)
		resultState = resultState.slice(0, 10);
		localStorage.setItem('_resultState', JSON.stringify(resultState));
	}

	field.addEventListener('click', (event) => {
		const item = event.target
		
		if(item.classList.contains('cell') && !item.classList.contains('clicked') && !item.classList.contains('flaged')) {
			if (localStorage.getItem('_fieldState')) {
				handleClick()
				saveFieldState()
				handleOpenCell(Number(item.id))
			} else {
				handleStartInterval()
				handleClick()
				indexesBombs = generateBombs(Number(event.target.id), totalCellCount, bombsCount);
				saveFieldState()
				handleOpenCell(Number(item.id))
				const catImg = document.querySelector('#catImg');
				catImg.src = "./assets/cat-good.png"
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
				saveFieldState()
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
		restartGame()
	});

	//additionCountBombs
	const additionBombsBtn = document.querySelector('#additionBombsBtn');
	const additionBombsInput = document.querySelector('#additionBombsInput');
	additionBombsBtn.addEventListener('click', () => {
		changeLevelOrCountBombs(additionBombsInput.value)
		restartGame()
	});
}