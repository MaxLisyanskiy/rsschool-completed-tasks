const body = document.querySelector("body");
const popup = document.querySelector("#popup");
const popupBack = document.querySelector("#popupBack");
const helpLink = document.querySelector("#helpLink");
const contactsLink = document.querySelector("#contactsLink");
const burg = document.querySelector("#burg");

function handleToggleMenu(event) {
    if(event) event.preventDefault();
    popup.classList.toggle("active");
    popupBack.classList.toggle("active");
    burg.classList.toggle("active");
    body.classList.toggle("noScroll");
}

burg.addEventListener("click", event => handleToggleMenu(event));

popupBack.addEventListener("click", event => handleToggleMenu(event));

helpLink && helpLink.addEventListener("click",  () => handleToggleMenu());

contactsLink.addEventListener("click", () => handleToggleMenu());