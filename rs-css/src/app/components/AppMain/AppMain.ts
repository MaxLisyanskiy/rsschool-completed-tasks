import "./AppMain.scss";

import { StateLevels } from "../../types";
import { createButtonElement, createElement, createTextElement } from "../utils";

export default class AppMain {
  levels: StateLevels[];
  currentLevel: number;
  title: HTMLElement = document.createElement("h1");

  phone: HTMLElement = document.createElement("div");

  form: HTMLElement = document.createElement("form");
  formInput: HTMLInputElement = document.createElement("input");
  formBtnEnter: HTMLButtonElement = createButtonElement("form__enter", "Enter", "submit");
  formBtnHelp: HTMLButtonElement = createButtonElement("form__help", "Help?", "button");

  htmlViewer: HTMLElement = createElement("div", "layout__html");

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
  }

  private createRowNumbers(className: string): HTMLElement {
    const numbers = createElement("div", className);
    for (let i = 1; i < 20; i++) {
      numbers.innerHTML += `${i}<br>`;
    }
    return numbers;
  }

  private createForm(): HTMLElement {
    this.form = createElement("div", "form");

    this.formInput = document.createElement("input");
    this.formInput.classList.add("form__input", "blinking");
    this.formInput.placeholder = "Type in a CSS selector";

    const formInputWrapp = createElement("div", "form__wrapp");
    formInputWrapp.append(this.formInput, this.formBtnEnter, this.formBtnHelp);

    const formDescription = createElement("div", "form__descr");
    formDescription.innerHTML = `
      {
        <br>
        <span>/* Styles would go here. */</span>
        <br>
      }
    `;
    this.form.append(formInputWrapp, formDescription);

    return this.form;
  }

  private createPhoneSection(): HTMLElement {
    const phoneSection = createElement("section", "table");

    this.title = createTextElement("h1", "table__title", this.levels[this.currentLevel].title);
    this.phone = createElement("div", "table__phone");

    const phoneWrapp = createElement("div", "table__wrapp");
    phoneWrapp.append(this.title, this.phone);

    const editor = createElement("div", "editor");

    const pane = document.createElement("div");
    pane.classList.add("editor__item", "pane");
    const paneHeader = createTextElement("p", "pane__title", "CSS Editor <span>style.css</span>");
    const formWrapper = createElement("div", "pane__wrapp");
    formWrapper.append(this.createRowNumbers("pane__numbers"), this.createForm());
    pane.append(paneHeader, formWrapper);

    const layout = document.createElement("div");
    layout.classList.add("editor__item", "layout");
    const layoutHeader = createTextElement("p", "layout__title", "HTML Viewer <span>table.html</span>");
    const layoutWrapper = createElement("div", "layout__wrapp");
    layoutWrapper.append(this.createRowNumbers("layout__numbers"), this.htmlViewer);
    layout.append(layoutHeader, layoutWrapper);

    editor.append(pane, layout);

    phoneSection.append(phoneWrapp, editor);

    return phoneSection;
  }

  public getHtmlElement = (): HTMLElement => {
    const main = document.createElement("main");
    main.classList.add("main");
    main.append(this.createPhoneSection());
    return main;
  };
}
