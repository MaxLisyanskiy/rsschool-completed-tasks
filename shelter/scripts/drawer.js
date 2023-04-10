const body = document.querySelector("body");
const drawer = document.querySelector("#drawer");
const drawerBack = document.querySelector("#drawerBack");
const helpLink = document.querySelector("#helpLink");
const contactsLink = document.querySelector("#contactsLink");
const burg = document.querySelector("#burg");

function handleToggleMenu(event) {
    if(event) event.preventDefault();
    drawer.classList.toggle("active");
    drawerBack.classList.toggle("active");
    burg.classList.toggle("active");
    body.classList.toggle("noScroll");
}

burg.addEventListener("click", event => handleToggleMenu(event));

drawerBack.addEventListener("click", event => handleToggleMenu(event));

helpLink && helpLink.addEventListener("click",  () => handleToggleMenu());

contactsLink.addEventListener("click", () => handleToggleMenu());