import type { CreateRandomCar } from "../types";
import { NEW_CAR_MODELS, NEW_CAR_NAMES } from "./constants";

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

export function createInputElement(
  className: string[] = [],
  id: string,
  name: string,
  type: string,
  value: string,
  required: boolean = false,
  disabled: boolean = false,
): HTMLInputElement {
  const attributes: string[] = ["id", "name", "type", "value", "required", "disabled"];

  const element = document.createElement("input");
  element.classList.add(...className);
  attributes.forEach((attr, i) => {
    if (arguments[i + 1]) {
      element.setAttribute(attr, arguments[i + 1]);
    }
  });

  return element;
}

export function createActionBtnElement(text: string, disabled: boolean = false): HTMLButtonElement {
  const element = document.createElement("button");
  element.classList.add("actions__btn");
  element.innerHTML = text;
  if (disabled) element.setAttribute("disabled", "true");

  return element;
}

export function createBtnElement(
  className: string[] = [],
  type: string,
  text: string,
  disabled: Boolean = false,
): HTMLButtonElement {
  const element = document.createElement("button");
  element.classList.add(...className);
  element.innerHTML = text;
  element.setAttribute("type", type);
  if (disabled) element.setAttribute("disabled", "true");

  return element;
}

export function createLinkElement(text: string, href: string, className: string[] = []): HTMLAnchorElement {
  const element = document.createElement("a");
  element.innerHTML = text;
  element.setAttribute("href", href);
  element.classList.add(...className);

  return element;
}

export function createArrayWithNewRandomCars(): CreateRandomCar {
  const randomName: string = NEW_CAR_NAMES[Math.floor(Math.random() * NEW_CAR_NAMES.length)];
  const randomModel: string = NEW_CAR_MODELS[Math.floor(Math.random() * NEW_CAR_MODELS.length)];

  const newCarName = `${randomName} ${randomModel}`;
  const newCarColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return { newCarName, newCarColor };
}

export function createCarSvg(color: string, className: string): HTMLElement {
  const carSvg = document.createElement("div");
  carSvg.classList.add(className);
  carSvg.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 512 512">
    <path fill="${color}" d="M408.29 262.879a35.125 35.125 0 1 0 35.125 35.125 35.17 35.17 0 0 0-35.125-35.125zm0 62.873a27.736 27.736 0 1 1 27.736-27.737 27.736 27.736 0 0 1-27.736 27.748zm8.876-27.737a8.876 8.876 0 1 1-8.876-8.875 8.876 8.876 0 0 1 8.876 8.875zm-265.538 0a35.125 35.125 0 1 0-35.126 35.126 35.17 35.17 0 0 0 35.126-35.126zm-35.126 27.737a27.736 27.736 0 1 1 27.737-27.737 27.736 27.736 0 0 1-27.737 27.748zm345.452-21.823a53.997 53.997 0 1 0-107.617-5.925 53.665 53.665 0 0 0 5.447 23.61H165.008a53.986 53.986 0 1 0-101.849-15.211C37.542 295.64 21 278.033 21 250.186c0-28.846 86.87-69.418 142.122-71.327v34.094a24.83 24.83 0 0 0 24.83 24.83h47.517a24.774 24.774 0 0 0 24.409-20.758s-1.62-21.668-6.813-25.518l3.407-2.54 24.474 28.08h94.104c63.994-.022 115.95 23.42 115.95 52.266 0 13.314-10.973 25.396-29.046 34.616zm-336.576-5.925a8.876 8.876 0 1 1-8.876-8.876 8.876 8.876 0 0 1 8.876 8.887z"/>
  </svg>
  `;

  return carSvg;
}
