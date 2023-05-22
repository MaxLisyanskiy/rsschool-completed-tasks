export function gameEvents() {
	let time = 0;
	let interval = 0;
	let bombsCount = 0;
	let flagsCount = 10;
	let clicksCount = 0;

    const field = document.querySelector('.field');
    
	function changeLevelOrCountBombs(value) {
		const flags = document.querySelector('#flags')
		const additionBombsInput = document.querySelector('#additionBombsInput')
		clearInterval(interval);

		bombsCount = value;
		flagsCount = value;
		localStorage.setItem('bombsCount', value);
		localStorage.setItem('flagsCount', value);

		flags.innerText = flagsCount;
		additionBombsInput.value = bombsCount;
	}

	function handleClick() {
		const clicks = document.querySelector('#clicks');

		clicksCount++;
		clicks.innerText = clicksCount;
		localStorage.setItem('clicksCount', clicksCount);
	}

	function handleToggleFlag(action) {
		const flags = document.querySelector('#flags');

		if(action === 'add') {
			flagsCount--;
			flags.innerText = flagsCount;
			localStorage.setItem('flagsCount', flagsCount);
		} else {
			flagsCount++;
			flags.innerText = flagsCount;
			localStorage.setItem('flagsCount', flagsCount);
		}
	}

	function handleStartInterval() {
		const timer = document.querySelector('#timer');

		time = 1;
		timer.innerText = 1;
		interval = setInterval(() => {
			time++;
			timer.innerText = time;
			localStorage.setItem('timer', time);
		}, 1000);
	}

	//additionLevel
	const additionLevel = document.querySelector('#additionLevel');
	additionLevel.addEventListener('change', (event) => {
		const value = event.target.value
		localStorage.setItem('level', value);
		changeLevelOrCountBombs(value === 'easy' ? 10 : value === 'medium' ? 15 : 25)
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

			if (localStorage.getItem('fieldState')) {
				cliskCount();
				openCell(cell.id);
				saveState();
				checkWinner();
			} else {
				handleStartInterval()
				handleClick()



				// cliskCount();
				// createBobms(SIZE, cell.id, bombsQuantity);
				// createArrayOfNotBombs();
				// saveState();
				// checkWinner();
			}
		}
    });

	field.addEventListener('contextmenu', (event) => {
		event.preventDefault();

		const item = event.target
		
		if (item.classList.contains('cell') && !item.classList.contains('clicked') && flagsCount > 0 ) {
			
			if (item.classList.contains('flaged')) {
				item.classList.remove('flaged')
				item.innerText = '';
				handleToggleFlag('remove')
			} else {
				item.classList.add('flaged')
				item.innerText = '🚩';
				handleToggleFlag('add')
			}
		}
	});
}