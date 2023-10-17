import "./AppPopup.scss";

import { createButtonElement, createElement, createTextElement } from "../utils";
import { GameLevelResult, GameResults } from "../../types";

export default class AppPopup {
  popup: HTMLElement = createElement("div", "popup");
  popupResult: HTMLElement = createElement("div", "popup__result");
  popupBtnBack: HTMLButtonElement = createButtonElement("popup__back", "Back", "button", () => this.handleClosePopup());
  popupBtnReset: HTMLButtonElement = createButtonElement("popup__reset", "Reset Game", "button");

  private handleClosePopup = (): void => {
    this.popup.classList.remove("show");
  };

  private createPopupResult = (gameResults: GameResults): void => {
    let correct = 0;
    let help = 0;

    for (const key in gameResults) {
      if (gameResults[key].result === GameLevelResult.DONE) {
        correct++;
      } else if (gameResults[key].result === GameLevelResult.HELP) {
        help++;
      }
    }

    this.popupResult.innerHTML = `
      <p>✔️ Correct: <span>${correct}</span></p>
      <p>🆘 With Help: <span>${help}</span></p>
      <p>❌ Not Answer: <span>${10 - (correct + help)}</span></p>
    `;
  };

  private createModal = (): void => {
    const popupContent: HTMLElement = createElement("div", "popup__content");
    const popupTitle: HTMLElement = createTextElement("h2", "popup__title", "🎉 <span>You did it!</span> 🎉");
    const popupSubtitle: HTMLElement = createTextElement("h3", "popup__subtitle", "You rock at CSS. 💪🏻");

    const popupActions: HTMLElement = createElement("div", "popup__actions");
    popupActions.append(this.popupBtnBack, this.popupBtnReset);

    popupContent.append(popupTitle, popupSubtitle, this.popupResult, popupActions);
    this.popup.append(popupContent);
  };

  public setActionsReset = (resetGameLevels: Function): void => {
    this.popupBtnReset.addEventListener("click", () => {
      this.handleClosePopup();
      resetGameLevels();
    });
  };

  public showPopup(gameResults: GameResults) {
    this.popup.classList.add("show");
    this.createPopupResult(gameResults);
  }

  public getHtmlElement(): HTMLElement {
    this.createModal();
    return this.popup;
  }
}
