import "./AppSidebar.scss";
import { createElement, createTextElement } from "../utils";

export default class AppSidebar {
  showMenu: boolean = false;
  header: HTMLElement = document.createElement("div");
  info: HTMLElement = document.createElement("div");
  list: HTMLElement = document.createElement("div");
  burgerIcon: HTMLElement = document.createElement("div");

  constructor() {
    this.createSidebarHeader();
    this.createSidebarInfo();
    this.createSidebarList();
  }

  private createSidebarHeader(): void {
    this.header = createElement("div", "sidebar-header");

    const headerLevel = createElement("div", "header-level");
    headerLevel.innerHTML = `
      <p class="header-level__title">Level 1 of 10</p>
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

    const title = createTextElement("h2", "sidebar-info__title", "Type Selector");
    const subTitle = createTextElement("h3", "sidebar-info__subtitle", "Select elements by their type");
    const syntax = createTextElement("span", "sidebar-info__syntax", "A");
    const description = createTextElement(
      "p",
      "sidebar-info__description",
      "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
    );

    const examplesWrapp = createElement("div", "sidebar-example");
    const exampleTitle = createTextElement("h4", "sidebar-example__title", "Examples:");
    const exampleOption = createTextElement(
      "p",
      "sidebar-example__option",
      "<strong>div</strong> selects all <tag>div</tag> elements.",
    );
    examplesWrapp.append(exampleTitle, exampleOption);

    this.info.append(title, subTitle, syntax, description, examplesWrapp);
  }

  private createSidebarList(): void {
    this.list = createElement("div", "sidebar-list");
    const title = createTextElement("h3", "sidebar-list__title", "Choose a level:");

    const levelList = createElement("ul", "level-list");

    for (let i = 1; i < 11; i++) {
      const level = createElement("li", "level-list__item");
      level.innerHTML = `
        <span class="level-list__check"></span>
        <p class="level-list__number">${i}</p>
        <p class="level-list__title">A</p>
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
