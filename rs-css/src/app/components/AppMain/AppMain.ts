import "./AppMain.scss";

import { GameLevelResult, GameResults, StateLevels } from "../../types";
import {
  checkGameLevelResult,
  createButtonElement,
  createElement,
  createRowNumbers,
  createTextElement,
  getTagAttributes,
} from "../utils";

export default class AppMain {
  levels: StateLevels[];
  currentLevel: number;
  gameResults: GameResults;

  tableSection: HTMLElement = createElement("section", "table");
  phone: HTMLElement = createElement("div", "table__phone");

  editorSection: HTMLElement = createElement("section", "editor");
  form: HTMLElement = createElement("form", "form");
  formInput: HTMLInputElement = document.createElement("input");
  formBtnEnter: HTMLButtonElement = createButtonElement("form__enter", "Enter", "submit");
  formBtnHelp: HTMLButtonElement = createButtonElement("form__help", "Help?", "button");

  htmlViewer: HTMLElement = createElement("div", "layout__html");

  constructor(levels: StateLevels[], currentLevel: number, gameResults: GameResults) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.gameResults = gameResults;
  }

  private createForm(levels: StateLevels[], currentLevel: number, gameResults: GameResults): HTMLElement {
    const levelResult = checkGameLevelResult(gameResults, currentLevel) === GameLevelResult.TODO;

    this.form.innerHTML = "";
    this.formInput = document.createElement("input");

    this.formInput.classList.add("form__input", "blinking");
    this.formInput.type = "text";
    this.formInput.id = "formInput";
    this.formInput.placeholder = "Type in a CSS selector";

    this.formBtnEnter.type = "submit";
    this.formBtnEnter.disabled = false;
    this.formBtnHelp.disabled = false;

    this.formInput.addEventListener("input", () => {
      return this.formInput.value.length === 0
        ? this.formInput.classList.add("blinking")
        : this.formInput.classList.remove("blinking");
    });

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

  private createHtmlTags = (element: HTMLElement): HTMLElement => {
    const div = document.createElement("div");
    div.classList.add("code");
    const openTag = `&lt${element.nodeName.toLocaleLowerCase()}${getTagAttributes(element)}>`;
    const closedTag = `&lt;/${element.nodeName.toLocaleLowerCase()}>`;
    if (element.children.length > 0) {
      div.append(createTextElement("span", "code__item", `${openTag}`));
      for (let i = 0; i < element.children.length; i += 1) {
        div.append(this.createHtmlTags(element.children[i].cloneNode(true) as HTMLElement));
      }
      div.append(createTextElement("span", "code__item", `${closedTag}`));
    } else {
      div.append(createTextElement("span", "code__item", `${openTag}${closedTag}`));
    }
    return div;
  };

  private createTableSection(levels: StateLevels[], currentLevel: number): void {
    this.tableSection.innerHTML = "";

    const phoneWrapp = createElement("div", "table__wrapp");
    const title = createTextElement("h1", "table__title", levels[currentLevel].title);
    phoneWrapp.append(title, this.phone);
    this.phone.innerHTML = levels[currentLevel].phoneCode;
    this.tableSection.append(phoneWrapp);
  }

  private createEditorSection(levels: StateLevels[], currentLevel: number, gameResults: GameResults): void {
    this.editorSection.innerHTML = "";

    const pane = document.createElement("div");
    pane.classList.add("editor__item", "pane");
    const paneHeader = createTextElement("p", "pane__title", "CSS Editor <span>style.css</span>");
    const formWrapper = createElement("div", "pane__wrapp");
    formWrapper.append(createRowNumbers("pane__numbers"), this.createForm(levels, currentLevel, gameResults));
    pane.append(paneHeader, formWrapper);

    const layout = document.createElement("div");
    layout.classList.add("editor__item", "layout");
    const layoutHeader = createTextElement("p", "layout__title", "HTML Viewer <span>table.html</span>");
    const layoutWrapper = createElement("div", "layout__wrapp");

    this.htmlViewer.innerHTML = "";

    const container = document.createElement("div");
    container.innerHTML = levels[currentLevel].viewerCode;
    const arrCode = document.createDocumentFragment();
    container.childNodes.forEach((item) => {
      if (item.nodeType === 1) {
        arrCode.append(this.createHtmlTags(item as HTMLElement));
      }
    });
    this.htmlViewer.append(arrCode);

    layoutWrapper.append(createRowNumbers("layout__numbers"), this.htmlViewer);

    layout.append(layoutHeader, layoutWrapper);

    this.editorSection.append(pane, layout);
  }

  public handlePrintSelector = (cssSelector: string, callback: (argument: string) => void) => {
    let count: number = 0;

    this.formInput.classList.remove("blinking");
    this.formInput.value = "";

    const typeWriter = (): void => {
      if (count < cssSelector.length) {
        this.formInput.value += cssSelector[count];
        count++;
        setTimeout(typeWriter, 500);
      } else {
        callback("done");
      }
    };

    typeWriter();
  };

  public setActions = (
    handleShowTooltip: Function,
    handleCheckSubmit: Function,
    handleShowHelpSelector: Function,
  ): void => {
    this.phone.addEventListener("mouseover", (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className !== "table__phone") {
          handleShowTooltip(e);
        }
      }
    });
    this.phone.addEventListener("mouseout", (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className !== "table__phone") {
          handleShowTooltip(e);
        }
      }
    });

    this.htmlViewer.addEventListener("mouseover", (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className === "code") {
          handleShowTooltip(e);
        }
      }
      handleShowTooltip(e);
    });
    this.htmlViewer.addEventListener("mouseout", (e: MouseEvent): void => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className === "code") {
          handleShowTooltip(e);
        }
      }
      handleShowTooltip(e);
    });

    this.form.addEventListener("submit", (e: SubmitEvent): void => {
      e.preventDefault();
      if (e.target instanceof HTMLFormElement) {
        e.target.formInput.value.trim() !== "" && handleCheckSubmit(e.target.formInput.value, GameLevelResult.DONE);
      }
    });

    this.formBtnHelp.addEventListener("click", (): void => handleShowHelpSelector());
  };

  public loadNewContent(levels: StateLevels[], currentLevel: number, gameResults: GameResults): void {
    this.createTableSection(levels, currentLevel);
    this.createEditorSection(levels, currentLevel, gameResults);
  }

  public getHtmlElement = (): HTMLElement => {
    const main = document.createElement("main");
    main.classList.add("main");
    this.loadNewContent(this.levels, this.currentLevel, this.gameResults);
    main.append(this.tableSection, this.editorSection);
    return main;
  };
}
