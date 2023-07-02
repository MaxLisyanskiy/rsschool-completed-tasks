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
  return btn;
}

export function createRowNumbers(className: string): HTMLElement {
  const numbers = createElement("div", className);
  for (let i = 1; i < 20; i++) {
    numbers.innerHTML += `${i}<br>`;
  }
  return numbers;
}
