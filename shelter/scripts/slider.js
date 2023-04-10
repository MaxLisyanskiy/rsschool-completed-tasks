import pets from "./pets.js";
import {showPopup} from "./popup.js";

let pastArr = [];
let currArr = [];
let nextArr = [];
let cardsAmount = 3

// listeners
const prevBtn = document.querySelector(".prevBtn");
const prevBtnMob = document.querySelector(".prevBtnMob");
const nextBtn = document.querySelector(".nextBtn");
const nextBtnMob = document.querySelector(".nextBtnMob");
const slider = document.querySelector(".slider-cards");

const cardsPastBlock = document.querySelector(".cardsPastBlock");
const cardsCurrentBlock = document.querySelector(".cardsCurrentBlock");
const cardsNextBlock = document.querySelector(".cardsNextBlock");

function handleAddCardsInBlocks(arr, block) {
    block.innerHTML = ""
    arr.forEach(item => {
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
        block.appendChild(div);
    })
}

const randomArray = (min, max) => {
    return Math.floor(min + Math.random() * (max - min + 1))
};

function init() {
    // cardsAmount = window.innerWidth <= 500 ? 1 : window.innerWidth <= 1000 ? 2 : 3
    cardsAmount = 3

    while (currArr.length < cardsAmount) {
        const randomItem = pets[randomArray(0, 7)]
        if (!currArr.includes(randomItem)) {
            currArr.push(randomItem);
        }
    }
    while (pastArr.length < cardsAmount) {
        const randomItem = pets[randomArray(0, 7)];
        if (!pastArr.includes(randomItem) && !currArr.includes(randomItem)) {
            pastArr.push(randomItem);
        }
    }
    while (nextArr.length < cardsAmount) {
        const randomItem = pets[randomArray(0, 7)];
        if (!nextArr.includes(randomItem) && !currArr.includes(randomItem)) {
            nextArr.push(randomItem);
        }
    }

    handleAddCardsInBlocks(currArr, cardsCurrentBlock)
    handleAddCardsInBlocks(pastArr, cardsPastBlock)
    handleAddCardsInBlocks(nextArr, cardsNextBlock)
}

function onChangeSlide(elem) {
    const className = elem === 'prevBtn' ? "slider_left" : "slider_right"
    slider.classList.add(className);
    prevBtn.setAttribute('disabled', 'disabled');
    prevBtnMob.setAttribute('disabled', 'disabled');
    nextBtn.setAttribute('disabled', 'disabled');
    nextBtnMob.setAttribute('disabled', 'disabled');
}

prevBtn.addEventListener("click", () => onChangeSlide('prevBtn'));
prevBtnMob.addEventListener("click", () => onChangeSlide('prevBtn'));
nextBtn.addEventListener("click", () => onChangeSlide('nextBtn'));
nextBtnMob.addEventListener("click", () => onChangeSlide('nextBtnMob'));


slider.addEventListener("animationend", (event) => {
    const anim = event.animationName

    if (anim === "left") {
        slider.classList.remove("slider_left");
        nextArr = currArr
        currArr = pastArr
        handleAddCardsInBlocks(currArr, cardsCurrentBlock)
        handleAddCardsInBlocks(nextArr, cardsNextBlock)

        pastArr = []

        while (pastArr.length < cardsAmount) {
            const randomItem = pets[randomArray(0, 7)];
            if (!pastArr.includes(randomItem) && !currArr.includes(randomItem)) {
                pastArr.push(randomItem);
            }
        }

        handleAddCardsInBlocks(pastArr, cardsPastBlock)

    } else {
        slider.classList.remove("slider_right");
        pastArr = currArr
        currArr = nextArr
        handleAddCardsInBlocks(currArr, cardsCurrentBlock)
        handleAddCardsInBlocks(pastArr, cardsPastBlock)

        nextArr = []

        while (nextArr.length < cardsAmount) {
            const randomItem = pets[randomArray(0, 7)];
            if (!nextArr.includes(randomItem) && !currArr.includes(randomItem)) {
                nextArr.push(randomItem);
            }
        }

        handleAddCardsInBlocks(nextArr, cardsNextBlock)
    }

    prevBtn.removeAttribute('disabled');
    prevBtnMob.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');
    nextBtnMob.removeAttribute('disabled');

});


// start
init()