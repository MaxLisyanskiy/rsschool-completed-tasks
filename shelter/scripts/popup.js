const body = document.querySelector("body");
const cards = document.querySelectorAll(".pets-cards__item");
const close = document.querySelector("#close");
const popup = document.querySelector("#popup");
const popupWrapp = document.querySelector(".popup__wrapp");

import pets from "./pets.js";

function showPopup(card) {
    const cardName = card.querySelector(".pets-cards__title").innerText;
    const item = pets.find(pet => pet.name === cardName)
    const popupLayout = `
        <div class="popup-content">
            <img class="popup-content__img" src="${item.img}" alt="${item.name}">
            <div class="popup-content__wrapp">
                <h3 class="popup-content__title">${item.name}</h3>
                <h4 class="popup-content__subtitle">${item.type} - ${item.breed}</h4>
                <p class="popup-content__descr">${item.description}</p>
                <ul class="popup-content__list">
                    <li><p><span>Age:</span> ${item.age}</p></li>
                    <li>
                        <p><span>Inoculations:</span> ${item.inoculations.join(", ")}</p>
                    </li>
                    <li>
                        <p><span>Diseases:</span> ${item.diseases.join(", ")}</p>
                    </li>
                    <li>
                        <p><span>Parasites:</span> ${item.parasites.join(", ")}</p>
                    </li>
                </ul>
            </div>
        </div>
    `;

    popupWrapp.insertAdjacentHTML("afterbegin", popupLayout);
    popup.classList.add("open");
    body.classList.add("noScroll");
}

cards.forEach(card => {
    card.addEventListener("click", () => showPopup(card));
})

close.addEventListener("click", () => {
    let elem = document.querySelector(".popup-content");
    elem.remove();
    popup.classList.remove("open");
    body.classList.remove("noScroll");
});

popup.addEventListener("click", closeOnBackDropClick);

function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement
  if (isClickedOnBackDrop) {
    let elem = document.querySelector(".popup-content");
    elem.remove();
    popup.classList.remove("open");
    body.classList.remove("noScroll");
  }
}