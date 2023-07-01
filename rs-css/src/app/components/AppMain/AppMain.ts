import { createButtonElement, createElement, createTextElement } from "../utils";
import "./AppMain.scss";

export default class AppMain {
  title: HTMLElement = document.createElement("h1");

  form: HTMLElement = document.createElement("form");
  formInput: HTMLInputElement = document.createElement("input");
  formBtnEnter: HTMLButtonElement = createButtonElement("form__enter", "Enter", "submit");
  formBtnHelp: HTMLButtonElement = createButtonElement("form__help", "Help?", "button");

  htmlViewer: HTMLElement = createElement("div", "layout__html");

  private createFormRowNumbers(className: string): HTMLElement {
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

    // this.formBtnEnter = createButtonElement("form__enter", "Enter", "submit");

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

  createPhoneSection(): HTMLElement {
    const phoneSection = document.createElement("section");
    phoneSection.classList.add("table");

    this.title = createTextElement("h1", "table__title", "Select the plates");

    const phone = createElement("div", "table__phone");

    const editor = createElement("div", "editor");

    const pane = document.createElement("div");
    pane.classList.add("editor__item", "pane");
    const paneHeader = createTextElement("p", "pane__title", "CSS Editor <span>style.css</span>");
    const formWrapper = createElement("div", "pane__wrapp");
    formWrapper.append(this.createFormRowNumbers("pane__numbers"), this.createForm());
    pane.append(paneHeader, formWrapper);

    const layout = document.createElement("div");
    layout.classList.add("editor__item", "layout");
    const layoutHeader = createTextElement("p", "layout__title", "HTML Viewer <span>table.html</span>");
    const layoutWrapper = createElement("div", "layout__wrapp");
    layoutWrapper.append(this.createFormRowNumbers("layout__numbers"), this.htmlViewer);
    layout.append(layoutHeader, layoutWrapper);

    editor.append(pane, layout);

    phoneSection.append(this.title, phone, editor);

    return phoneSection;
  }

  createEditorSection(): HTMLElement {
    const phoneSection = document.createElement("section");
    phoneSection.classList.add("table");

    this.title = createTextElement("h1", "table__title", "Select the plates");

    const phone = createElement("div", "table__phone");

    phoneSection.append(this.title, phone);

    return phoneSection;
  }

  getHtmlElement(): HTMLElement {
    const main = document.createElement("main");
    main.classList.add("main");
    main.append(this.createPhoneSection());
    return main;
  }
}
