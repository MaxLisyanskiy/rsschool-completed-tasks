import "./AppSidebar.scss";

import { checkGameLevelResult, createButtonElement, createElement, createTextElement } from "../utils";
import { GameResults, SidebarActionType, StateLevels } from "../../types";

export default class AppSidebar {
  levels: StateLevels[];
  currentLevel: number;
  gameResults: GameResults;
  showList: boolean = false;
  header: HTMLElement = createElement("div", "sidebar-header");
  info: HTMLElement = createElement("div", "sidebar-info");
  list: HTMLElement = createElement("div", "sidebar-list");
  listLevel: HTMLElement = createElement("ul", "level-list");
  burgerIcon: HTMLElement = document.createElement("div");
  prevArrow: HTMLElement = createElement("span", "header-arrow__prev");
  nextArrow: HTMLElement = createElement("span", "header-arrow__next");
  resetGameBtn: HTMLButtonElement = createButtonElement("sidebar-reset", "Reset Levels", "button");

  constructor(levels: StateLevels[], currentLevel: number, gameResults: GameResults) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.gameResults = gameResults;
  }

  private toggleShowMenuList = (): void => {
    this.burgerIcon.classList.toggle("close");
    this.list.classList.toggle("active");
    this.showList = !this.showList;
  };

  private createSidebarHeader = (levels: StateLevels[], currentLevel: number, gameResults: GameResults): void => {
    this.header.innerHTML = ``;

    const headerLevel = createElement("div", "header-level");
    headerLevel.innerHTML = `
      <p class="header-level__title">Level ${currentLevel + 1} of ${levels.length}</p>
      <span class="header-level__check ${checkGameLevelResult(gameResults, currentLevel)}"></span>
    `;

    const headerArrow = createElement("div", "header-arrow");
    headerArrow.append(this.prevArrow, this.nextArrow);

    const headerMenu = createElement("div", "header-menu", this.toggleShowMenuList);
    this.burgerIcon = createElement("div", "header-menu__burger");
    if (this.showList) this.burgerIcon.classList.add("close");
    headerMenu.append(this.burgerIcon);

    const headerActions = createElement("div", "sidebar-header__actions");
    headerActions.append(headerArrow, headerMenu);

    this.header.append(headerLevel, headerActions);
  };

  private createSidebarInfo = (levels: StateLevels[], currentLevel: number): void => {
    this.info.innerHTML = "";

    const title = createTextElement("h2", "sidebar-info__title", levels[currentLevel].sidebarTitle);
    const subTitle = createTextElement("h3", "sidebar-info__subtitle", levels[currentLevel].sidebarSubtitle);
    const syntax = createTextElement("span", "sidebar-info__syntax", levels[currentLevel].sidebarSyntax);

    const sidebarLeftSide = createElement("div", "sidebar-info__main");
    sidebarLeftSide.append(title, subTitle, syntax);

    const description = createTextElement("p", "sidebar-info__description", levels[currentLevel].sidebarDescr);

    let examplesWrapp = createElement("div", "sidebar-example__empty");

    if (levels[currentLevel].sidebarExamples.length !== 0) {
      examplesWrapp = createElement("div", "sidebar-example");
      const exampleTitle = createTextElement("h4", "sidebar-example__title", "Examples:");
      const wrapp: HTMLElement[] = [];
      levels[currentLevel].sidebarExamples.forEach((item: string) => {
        wrapp.push(createTextElement("p", "sidebar-example__option", item));
      });

      examplesWrapp.append(exampleTitle, ...wrapp);
    }

    this.info.append(sidebarLeftSide, description, examplesWrapp);
  };

  private createSidebarList = (levels: StateLevels[], currentLevel: number, gameResults: GameResults): void => {
    this.list.innerHTML = "";
    const title = createTextElement("h3", "sidebar-list__title", "Choose a level:");

    this.listLevel.innerHTML = "";

    for (let i = 0; i < levels.length; i++) {
      const level = createElement("li", "level-list__item");
      if (currentLevel === i) level.classList.add("active");
      level.setAttribute("level", String(i));
      level.innerHTML = `
        <span class="level-list__check ${checkGameLevelResult(gameResults, i)}"></span>
        <p class="level-list__number">${i + 1}</p>
        <p class="level-list__title">${levels[i].sidebarSyntax}</p>
      `;
      this.listLevel.append(level);
    }

    this.list.append(title, this.listLevel);
  };

  public setActionsForArrow = (handleChangeLevel: Function, resetGameLevels: Function): void => {
    this.prevArrow.addEventListener("click", () => handleChangeLevel(SidebarActionType.PREV));
    this.nextArrow.addEventListener("click", () => handleChangeLevel(SidebarActionType.NEXT));
    this.resetGameBtn.addEventListener("click", () => resetGameLevels());
  };

  public setActionsForList = (handleChangeLevel: Function): void => {
    this.listLevel.childNodes.forEach((item) => {
      item.addEventListener("click", () =>
        handleChangeLevel(SidebarActionType.LIST, (item as HTMLElement).getAttribute("level")),
      );
    });
  };

  public loadNewContent = (levels: StateLevels[], currentLevel: number, gameResults: GameResults) => {
    this.createSidebarHeader(levels, currentLevel, gameResults);
    this.createSidebarList(levels, currentLevel, gameResults);
    this.createSidebarInfo(levels, currentLevel);
  };

  public getHtmlElement = (): HTMLElement => {
    const sidebar = document.createElement("aside");
    sidebar.classList.add("sidebar");
    this.loadNewContent(this.levels, this.currentLevel, this.gameResults);
    sidebar.append(this.header, this.info, this.list, this.resetGameBtn);
    return sidebar;
  };
}
