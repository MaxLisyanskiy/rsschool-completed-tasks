import { GameLevelResult, GameResults } from "../types";

export function createElement(elem: string, className: string, func?: () => void): HTMLElement {
  const element = document.createElement(elem);
  element.classList.add(className);
  func && element.addEventListener("click", func);
  return element;
}

export function createTextElement(elem: string, className: string, text: string): HTMLElement {
  const element = document.createElement(elem);
  element.classList.add(className);
  element.innerHTML = text;
  return element;
}

export function createButtonElement(
  className: string,
  text: string,
  type: string,
  func?: () => void,
): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.classList.add(className);
  btn.innerHTML = text;
  btn.type = type;
  if (func) btn.addEventListener("click", func);
  return btn;
}

export function createRowNumbers(className: string): HTMLElement {
  const numbers = createElement("div", className);
  for (let i = 1; i < 11; i++) {
    numbers.innerHTML += `${i}<br>`;
  }
  return numbers;
}

export function checkGameLevelResult(gameResults: GameResults, currentLevel: number) {
  if (gameResults && gameResults[`${currentLevel}`]) {
    return gameResults[`${currentLevel}`].result;
  }

  return GameLevelResult.TODO;
}

export function getTagAttributes(elem: HTMLElement): string {
  let elemClass: string | null = null;
  let elemClassValues: string | null = elem.getAttribute("class");

  elemClass =
    elemClassValues !== null
      ? elemClassValues
          .split(" ")
          .filter((value) => value === "small")
          .join("")
      : null;

  const elemId: Attr | null = elem.attributes.getNamedItem("id");
  const attributes: string = `${elemClass ? ` class="${elemClass}"` : ""}${
    elemId && elemId.value ? ` id="${elemId.value}"` : ""
  }`;

  return attributes;
}
