import "./AppForm.scss";
import { createBtnElement, createElement, createInputElement } from "../../../utils/createFunctions";

export default class AppForm {
  public form: HTMLElement;

  private newCarWrapp: HTMLElement;
  private newCarInput: HTMLInputElement;
  private newCarColor: HTMLInputElement;
  private newCarBtn: HTMLButtonElement;

  private currentCarWrapp: HTMLElement;
  private currentCarInput: HTMLInputElement;
  private currentCarColor: HTMLInputElement;
  private currentCarBtn: HTMLButtonElement;

  public onCreateCar!: (name: string, color: string) => void;

  constructor() {
    this.form = createElement("div", ["form"], "");

    this.newCarWrapp = createElement("form", ["form__wrapp"], "");
    this.newCarInput = createInputElement(["form__input"], "new-car-input", "new-car-input", "text", "", true, false);
    this.newCarColor = createInputElement(
      ["form__color"],
      "new-car-color",
      "new-car-color",
      "color",
      "#ffffff",
      false,
      false,
    );
    this.newCarBtn = createBtnElement(["form__btn"], "submit", "Create", false);
    this.newCarWrapp.append(this.newCarInput, this.newCarColor, this.newCarBtn);

    this.currentCarWrapp = createElement("form", ["form__wrapp"], "");
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
      "#ffffff",
      false,
      true,
    );
    this.currentCarBtn = createBtnElement(["form__btn"], "submit", "Update", true);
    this.currentCarWrapp.append(this.currentCarInput, this.currentCarColor, this.currentCarBtn);

    this.form.append(this.newCarWrapp, this.currentCarWrapp);

    this.newCarWrapp.addEventListener("submit", (e: SubmitEvent): void => {
      e.preventDefault();
      if (this.newCarInput.value.trim() !== "") {
        this.onCreateCar(this.newCarInput.value, this.newCarColor.value);
        this.newCarInput.value = "";
        this.newCarColor.value = "#ffffff";
      }
    });
  }

  private toggleShowSelectedData = (show: boolean, name: string, color: string) => {
    this.currentCarInput.value = show ? name : "";
    this.currentCarColor.value = show ? color : "#ffffff";
    this.currentCarInput.disabled = show ? false : true;
    this.currentCarColor.disabled = show ? false : true;
    this.currentCarBtn.disabled = show ? false : true;
  };

  public addSelectedCarData = (
    id: number,
    name: string,
    color: string,
    onUpdateCar: (id: number, name: string, color: string) => void,
  ): void => {
    this.toggleShowSelectedData(true, name, color);

    this.currentCarWrapp.addEventListener("submit", (e: SubmitEvent): void => {
      e.preventDefault();
      if (this.currentCarInput.value.trim() !== "") {
        onUpdateCar(id, this.currentCarInput.value, this.currentCarColor.value);
        this.toggleShowSelectedData(false, "", "");
      }
    });
  };
}
