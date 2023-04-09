import pets from "./pets.js";
import {showPopup} from "./popup.js";

let minPages = 1
let maxPages = 0
let currentPage = 1;

let petsAmount = 8

let petsData = []

const petsSection = document.querySelector('.pets-cards');
const paginationBtns = document.querySelectorAll('.paginations__btn');
const paginationValue = document.querySelector('.paginations__page');


// вспомогающие функции
function randomPetsArray() {
    let arrPets = [...pets];
    let arrRandom = [];

    while(arrPets.length > 0) {
        let i = Math.floor(Math.random() * arrPets.length);
        arrRandom.push(arrPets[i]);
        arrPets.splice(i, 1);
    }
    return arrRandom;
}

function handleMakePetsArray() {
    let petsArray = [];

    for (let i = 0; i < 6; i++) {
        petsArray.push(...randomPetsArray())
    }

    petsData = petsArray
}

function handleCheckScreenWidth() {
    const width = window.innerWidth

    if(width <= 500) {
        return 3
    } else if(width <= 1000) {
        return 6
    } else {
        return 8
    }
}


// render functions
function renderPets() {
    minPages = 1;
    petsAmount = handleCheckScreenWidth();
    maxPages = Math.ceil(48 / petsAmount);

    petsSection.innerHTML = '';

    const items = petsData.slice((currentPage - 1) * petsAmount, currentPage * petsAmount);

    items.forEach(item => {
        const div = document.createElement('li');
        div.className = 'pets-cards__item'
        div.setAttribute('data-name', item.name)
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" width="270" height="270">
            <div class="pets-cards__content">
                <span class="pets-cards__title">${item.name}</span>
                <button type="button" class="pets-cards__btn">Learn more</button>
            </div>
        `
        div.onclick = () => {showPopup(div)}
        petsSection.appendChild(div);
    })
}

function renderPagination() {

    paginationBtns.forEach(btn => {
        const dataBtn = btn.getAttribute('data-btn')

        if (dataBtn === 'first' || dataBtn === 'prev') {
            if (currentPage === minPages) {
                btn.setAttribute("disabled", "disabled");
            } else {
                btn.removeAttribute('disabled');
            }
        } else {
            if (currentPage === maxPages) {
                btn.setAttribute("disabled", "disabled");
            } else {
                btn.removeAttribute('disabled');
            }
        }
    })

    paginationValue.value = currentPage;
}


// paginations
paginationBtns.forEach(btn => {
    const dataBtn = btn.getAttribute('data-btn')

    btn.addEventListener('click', () => {
        if (dataBtn === 'first') {
            currentPage = minPages;
        } else if (dataBtn === 'prev') {
            if (currentPage > minPages) {
                currentPage -= 1;
            }
        } else if (dataBtn === 'next') {
            if (currentPage < maxPages) {
                currentPage += 1;
            }
        } else {
            currentPage = maxPages;
        }
        renderPets();
        renderPagination()
    })
})

handleMakePetsArray()
renderPets();
renderPagination()