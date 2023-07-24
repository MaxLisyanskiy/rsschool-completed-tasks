import "./AppActionBtns.scss";
import { createBtnElement, createElement, createInputElement } from "../../../utils/createFunctions";

export default class AppActionBtns {
  public buttons: HTMLElement;
  public raceBtn: HTMLButtonElement;
  public resetBtn: HTMLButtonElement;
  private generateBtn: HTMLButtonElement;

  public onStartRacing!: () => void;
  public onResetRacing!: () => void;
  public onGenerateNewCars!: () => void;

  constructor() {
    this.buttons = createElement("div", ["actions"], "");

    this.raceBtn = createBtnElement(["actions__btn"], "button", "Race", false);
    this.resetBtn = createBtnElement(["actions__btn"], "button", "Reset", true);
    this.generateBtn = createBtnElement(["actions__btn"], "button", "Generate", false);

    this.raceBtn.onclick = () => this.onStartRacing();
    this.resetBtn.onclick = () => this.onResetRacing();
    this.generateBtn.addEventListener("click", (e: MouseEvent): void => {
      e.preventDefault();
      this.onGenerateNewCars();
    });

    this.buttons.append(this.raceBtn, this.resetBtn, this.generateBtn);
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
