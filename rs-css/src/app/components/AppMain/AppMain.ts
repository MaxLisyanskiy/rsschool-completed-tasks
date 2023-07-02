import "./AppMain.scss";

import { StateLevels } from "../../types";
import { createButtonElement, createElement, createRowNumbers, createTextElement } from "../utils";

export default class AppMain {
  levels: StateLevels[];
  currentLevel: number;

  tableSection: HTMLElement = createElement("section", "table");
  phone: HTMLElement = createElement("div", "table__phone");

  editorSection: HTMLElement = createElement("section", "editor");
  form: HTMLElement = document.createElement("form");
  formInput: HTMLInputElement = document.createElement("input");
  formBtnEnter: HTMLButtonElement = createButtonElement("form__enter", "Enter", "submit");
  formBtnHelp: HTMLButtonElement = createButtonElement("form__help", "Help?", "button");

  htmlViewer: HTMLElement = createElement("div", "layout__html");

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
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

  createHtmlTags = (element: HTMLElement): HTMLElement => {
    const div = document.createElement("div");
    div.classList.add("wrap");
    const openTag = `&lt${element.nodeName.toLocaleLowerCase()}>`;
    const closedTag = `&lt;/${element.nodeName.toLocaleLowerCase()}>`;
    if (element.children.length > 0) {
      div.append(createTextElement("span", "code", `${openTag}`));
      for (let i = 0; i < element.children.length; i += 1) {
        div.append(this.createHtmlTags(element.children[i].cloneNode(true) as HTMLElement));
      }
      div.append(createTextElement("span", "code", `${closedTag}`));
    } else {
      div.append(createTextElement("span", "code", `${openTag}${closedTag}`));
    }
    return div;
  };

  private createTableSection(levels: StateLevels[], currentLevel: number): void {
    this.tableSection.innerHTML = "";

    const phoneWrapp = createElement("div", "table__wrapp");
    const title = createTextElement("h1", "table__title", levels[currentLevel].title);
    phoneWrapp.append(title, this.phone);
    this.phone.innerHTML = levels[currentLevel].code;
    this.tableSection.append(phoneWrapp);
  }

  private createEditorSection(levels: StateLevels[], currentLevel: number): void {
    this.editorSection.innerHTML = "";

    const pane = document.createElement("div");
    pane.classList.add("editor__item", "pane");
    const paneHeader = createTextElement("p", "pane__title", "CSS Editor <span>style.css</span>");
    const formWrapper = createElement("div", "pane__wrapp");
    formWrapper.append(createRowNumbers("pane__numbers"), this.createForm());
    pane.append(paneHeader, formWrapper);

    const layout = document.createElement("div");
    layout.classList.add("editor__item", "layout");
    const layoutHeader = createTextElement("p", "layout__title", "HTML Viewer <span>table.html</span>");
    const layoutWrapper = createElement("div", "layout__wrapp");

    this.htmlViewer.innerHTML = "";

    const container = document.createElement("div");
    container.innerHTML = levels[currentLevel].code;
    const arrCode = document.createDocumentFragment();
    container.childNodes.forEach((item) => {
      if (item.nodeType === 1) arrCode.append(this.createHtmlTags(item as HTMLElement));
    });
    this.htmlViewer.append(arrCode);

    layoutWrapper.append(createRowNumbers("layout__numbers"), this.htmlViewer);

    layout.append(layoutHeader, layoutWrapper);

    this.editorSection.append(pane, layout);
  }

  public setActions = (handleShowTooltip: Function): void => {
    this.phone.addEventListener("mouseover", (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className !== "table__phone") {
          e.target.classList.add("outline");
          handleShowTooltip(e);
        }
      }
    });
    this.phone.addEventListener("mouseout", (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className !== "table__phone") {
          e.target.classList.remove("outline");
          handleShowTooltip(e);
        }
      }
    });
  };

  public loadNewContent(levels: StateLevels[], currentLevel: number): void {
    this.createTableSection(levels, currentLevel);
    this.createEditorSection(levels, currentLevel);
  }

  public getHtmlElement = (): HTMLElement => {
    const main = document.createElement("main");
    main.classList.add("main");
    this.loadNewContent(this.levels, this.currentLevel);
    main.append(this.tableSection, this.editorSection);
    return main;
  };
}
