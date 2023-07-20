export function createElement(elem: string, className: string[] = [], text?: string, func?: () => void): HTMLElement {
  const element = document.createElement(elem);
  element.classList.add(...className);
  element.innerHTML = text || "";
  func && element.addEventListener("click", func);
  return element;
}

export function createTextElement(elem: string, className: string, text: string): HTMLElement {
  const element = document.createElement(elem);
  element.classList.add(className);
  element.innerHTML = text;
  return element;
}
