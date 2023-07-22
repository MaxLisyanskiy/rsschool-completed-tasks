import "./AppForm.scss";
import { createBtnElement, createElement, createInputElement } from "../../../utils/createFunctions";

export default class AppForm {
  public form: HTMLElement;
  public newCarInput: HTMLInputElement;
  public newCarColor: HTMLInputElement;
  public newCarBtn: HTMLButtonElement;

  public currentCarInput: HTMLInputElement;
  public currentCarColor: HTMLInputElement;
  public currentCarBtn: HTMLButtonElement;

  constructor() {
    this.form = createElement("div", ["form"], "");

    const newCarWrapp = createElement("form", ["form__wrapp"], "");
    this.newCarInput = createInputElement(["form__input"], "new-car-input", "new-car-input", "text", "", true, false);
    this.newCarColor = createInputElement(
      ["form__color"],
      "new-car-color",
      "new-car-color",
      "color",
      "#fff",
      false,
      false,
    );
    this.newCarBtn = createBtnElement(["form__btn"], "submit", "Create", false);
    newCarWrapp.append(this.newCarInput, this.newCarColor, this.newCarBtn);

    const currentCarWrapp = createElement("form", ["form__wrapp"], "");
    this.currentCarInput = createInputElement(
      ["form__input"],
      "new-car-input",
      "new-car-input",
      "text",
      "",
      true,
      true,
    );
    this.currentCarColor = createInputElement(
      ["form__color"],
      "new-car-color",
      "new-car-color",
      "color",
      "#fff",
      false,
      true,
    );
    this.currentCarBtn = createBtnElement(["form__btn"], "submit", "Update", true);
    currentCarWrapp.append(this.currentCarInput, this.currentCarColor, this.currentCarBtn);

    this.form.append(newCarWrapp, currentCarWrapp);
  }
}
