import { createNewCellElement } from "../elements/field.js";

export function gameEvents() {
	let time = 0;
	let level = 'easy';
	let totalCellCount = 0;
	let interval = 0;
	let bombsCount = 0;
	let flagsCount = 0;
	let clicksCount = 0;

    const field = document.querySelector('.field');
    
	function changeLevelOrCountBombs(value) {
		const flags = document.querySelector('#flags')
		const additionBombsInput = document.querySelector('#additionBombsInput')
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

		for (let i = 0; i < totalCellCount; i++) {
			const cell = createNewCellElement(i);
			field.append(cell)
		}
	}

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


	field.addEventListener('click', (event) => {
		const item = event.target
		
		if(item.classList.contains('cell') && !item.classList.contains('clicked') && !item.classList.contains('flaged')) {

			item.classList.add('clicked')

			if (localStorage.getItem('_fieldState')) {

			} else {
				handleStartInterval()
				handleClick()
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
}