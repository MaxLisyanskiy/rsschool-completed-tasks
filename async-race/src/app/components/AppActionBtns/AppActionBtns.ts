import "./AppActionBtns.scss";
import { createBtnElement, createElement, createInputElement } from "../../../utils/createFunctions";

export default class AppActionBtns {
  public buttons: HTMLElement;
  private raceBtn: HTMLButtonElement;
  private resetBtn: HTMLButtonElement;
  private generateBtn: HTMLButtonElement;

  public onGenerateNewCars!: () => void;

  constructor() {
    this.buttons = createElement("div", ["actions"], "");

    this.raceBtn = createBtnElement(["actions__btn"], "button", "Race", false);
    this.resetBtn = createBtnElement(["actions__btn"], "button", "Reset", true);
    this.generateBtn = createBtnElement(["actions__btn"], "button", "Generate", false);

    this.buttons.append(this.raceBtn, this.resetBtn, this.generateBtn);

    this.generateBtn.addEventListener("click", (e: MouseEvent): void => {
      e.preventDefault();
      this.onGenerateNewCars();
    });
  }

  public onGenerateLoading = (disabled: boolean): void => {
    if (disabled) {
      this.generateBtn.disabled = true;
      this.generateBtn.innerHTML = `<image src="/loader.gif">`;
    } else {
      this.generateBtn.disabled = false;
      this.generateBtn.innerHTML = `Generate`;
    }
  };
}
