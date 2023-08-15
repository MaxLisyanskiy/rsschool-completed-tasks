import "./AppActionBtns.scss";
import { createActionBtnElement, createElement } from "../../utils/createFunctions";

export default class AppActionBtns {
  public buttons: HTMLElement;
  public raceBtn: HTMLButtonElement;
  public resetBtn: HTMLButtonElement;
  private generateBtn: HTMLButtonElement;

  public onStartRacing!: () => void;
  public onResetRacing!: () => void;
  public onGenerateNewCars!: () => void;

  constructor() {
    this.buttons = createElement("div", ["actions"]);

    this.raceBtn = createActionBtnElement("Race");
    this.resetBtn = createActionBtnElement("Reset", true);
    this.generateBtn = createActionBtnElement("Generate");

    this.raceBtn.onclick = () => this.onStartRacing();
    this.resetBtn.onclick = () => this.onResetRacing();
    this.generateBtn.addEventListener("click", (e: MouseEvent): void => {
      e.preventDefault();
      this.onGenerateNewCars();
    });

    this.buttons.append(this.raceBtn, this.resetBtn, this.generateBtn);
  }

  public onGenerateLoading = (disabled: boolean): void => {
    this.generateBtn.disabled = disabled;

    if (disabled) {
      this.generateBtn.innerHTML = '<image src="loader.gif">';
    } else {
      this.generateBtn.innerHTML = "Generate";
    }
  };
}
