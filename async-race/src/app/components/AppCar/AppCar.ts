import "./AppCar.scss";
import { createBtnElement, createElement, createCarSvg } from "../../../utils/createFunctions";

export default class AppCar {
  public car: HTMLElement;
  private title: HTMLElement;
  private selectBtn: HTMLButtonElement;
  private removeBtn: HTMLButtonElement;
  private engineStartBtn: HTMLButtonElement;
  private engineStopBtn: HTMLButtonElement;
  //   private color: string;
  private id: number;
  private image: HTMLElement;

  constructor(name: string, color: string, id: number) {
    this.id = id;

    this.car = createElement("li", ["car"]);
    this.title = createElement("h4", ["car__title"], `${name} (${id})`);

    const actionBtns = createElement("div", ["car-btns"]);
    this.selectBtn = createBtnElement(["car-btns__item"], "button", "Select", false);
    this.removeBtn = createBtnElement(["car-btns__item"], "button", "Remove", false);
    actionBtns.append(this.selectBtn, this.removeBtn);

    const road = createElement("div", ["car-road"]);
    const engineBtns = createElement("div", ["car-engine"]);
    this.engineStartBtn = createBtnElement(["car-engine__start"], "button", "A", false);
    this.engineStopBtn = createBtnElement(["car-engine__stop"], "button", "B", false);
    engineBtns.append(this.engineStartBtn, this.engineStopBtn);
    this.image = createCarSvg(color, "car__image");
    road.append(engineBtns, this.image);

    this.car.append(this.title, actionBtns, road);
  }
}
