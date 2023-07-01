import "./AppSidebar.scss";

import { createElement, createTextElement } from "../utils";
import { StateLevels } from "../../types";

export default class AppSidebar {
  levels: StateLevels[];
  currentLevel: number;
  showMenu: boolean = false;
  header: HTMLElement = document.createElement("div");
  info: HTMLElement = document.createElement("div");
  list: HTMLElement = document.createElement("div");
  burgerIcon: HTMLElement = document.createElement("div");

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.createSidebarHeader();
    this.createSidebarInfo();
    this.createSidebarList();
  }

  private createSidebarHeader(): void {
    this.header = createElement("div", "sidebar-header");

    const headerLevel = createElement("div", "header-level");
    headerLevel.innerHTML = `
      <p class="header-level__title">Level ${this.currentLevel} of ${this.levels.length}</p>
      <span class="header-level__check"></span>
    `;

    const headerArrow = createElement("div", "header-arrow");
    headerArrow.innerHTML = `
      <span class="header-arrow__prev"></span>
      <span class="header-arrow__next"></span>
    `;

    const headerMenu = createElement("div", "header-menu", this.toggleShowMenuList);
    this.burgerIcon = createElement("div", "header-menu__burger");
    headerMenu.append(this.burgerIcon);

    const headerActions = createElement("div", "sidebar-header__actions");
    headerActions.append(headerArrow, headerMenu);

    this.header.append(headerLevel, headerActions);
  }

  private createSidebarInfo(): void {
    this.info = createElement("div", "sidebar-info");

    const title = createTextElement("h2", "sidebar-info__title", this.levels[this.currentLevel].sidebarTitle);
    const subTitle = createTextElement("h3", "sidebar-info__subtitle", this.levels[this.currentLevel].sidebarSubtitle);
    const syntax = createTextElement("span", "sidebar-info__syntax", this.levels[this.currentLevel].sidebarSyntax);

    const sidebarLeftSide = createElement("div", "sidebar-info__main");
    sidebarLeftSide.append(title, subTitle, syntax);

    const description = createTextElement(
      "p",
      "sidebar-info__description",
      this.levels[this.currentLevel].sidebarDescr,
    );

    const examplesWrapp = createElement("div", "sidebar-example");

    if (this.levels[this.currentLevel].sidebarExamples.length !== 0) {
      const exampleTitle = createTextElement("h4", "sidebar-example__title", "Examples:");
      const wrapp: HTMLElement[] = [];
      this.levels[this.currentLevel].sidebarExamples.forEach((item: string) => {
        wrapp.push(createTextElement("p", "sidebar-example__option", item));
      });

      examplesWrapp.append(exampleTitle, ...wrapp);
    }

    this.info.append(sidebarLeftSide, description, examplesWrapp);
  }

  private createSidebarList(): void {
    this.list = createElement("div", "sidebar-list");
    const title = createTextElement("h3", "sidebar-list__title", "Choose a level:");

    const levelList = createElement("ul", "level-list");

    for (let i = 0; i < this.levels.length; i++) {
      const level = createElement("li", "level-list__item");
      level.innerHTML = `
        <span class="level-list__check"></span>
        <p class="level-list__number">${i + 1}</p>
        <p class="level-list__title">${this.levels[i].sidebarSyntax}</p>
      `;
      levelList.append(level);
    }

    this.list.append(title, levelList);
  }

  private toggleShowMenuList = (): void => {
    this.burgerIcon.classList.toggle("close");
    this.list.classList.toggle("active");
    this.showMenu = !this.showMenu;
  };

  public getHtmlElement(): HTMLElement {
    const sidebar = document.createElement("aside");
    sidebar.classList.add("sidebar");
    sidebar.append(this.header, this.info, this.list);
    return sidebar;
  }
}
