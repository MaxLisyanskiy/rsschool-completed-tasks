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
	let flagsCount = 0;
	let clicksCount = 0;

    const field = document.querySelector('.field');
    
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

		clicksCount++;
		clicks.innerText = clicksCount;
		localStorage.setItem('_clicksCount', clicksCount);
	}

	function handleToggleFlag(action) {
		const flags = document.querySelector('#flags');

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

	function createField() {
		field.innerHTML = '';
		field.setAttribute('class', `field ${level}`);

		for (let i = 1; i <= totalCellCount; i++) {
			const cell = createNewCellElement(i);
			field.append(cell)
		}
	}

	function handleOpenCell(id) {

		const nearBombsCount = searchBombs(indexesBombs, id, level)
		
		if (indexesBombs.includes(id)) {
			addCellBomb(id)
		} else if (nearBombsCount > 0){
			addCellNumber(id, nearBombsCount)
		}

	}


	field.addEventListener('click', (event) => {
		const item = event.target
		
		if(item.classList.contains('cell') && !item.classList.contains('clicked') && !item.classList.contains('flaged')) {

			item.classList.add('clicked')

			if (localStorage.getItem('_fieldState')) {
				handleClick()
				handleOpenCell(Number(item.id))
			} else {
				handleStartInterval()
				handleClick()
				indexesBombs = generateBombs(totalCellCount, bombsCount);
				handleOpenCell(Number(item.id))
				saveFieldState()
			}
		}
    });

	field.addEventListener('contextmenu', (event) => {
		event.preventDefault();

		const item = event.target
		
		if (item.classList.contains('cell') && !item.classList.contains('clicked') && flagsCount > 0 ) {
			
			if (item.classList.contains('flaged')) {
				item.classList.remove('flaged')
				item.innerHTML = '';
				handleToggleFlag('remove')
			} else {
				item.classList.add('flaged')
				item.innerHTML = '<span>🚩</span>';
				handleToggleFlag('add')
			}
		}
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