import "./AppNav.scss";
import { createElement, createLinkElement } from "../../../utils/createFunctions";
import { Pages } from "../../types";

export default class AppNav {
  public nav: HTMLElement;
  private garageLink: HTMLAnchorElement;
  private winnersLink: HTMLAnchorElement;

  constructor() {
    this.nav = createElement("nav", ["nav"]);

    this.garageLink = createLinkElement("Garage", "#garage", ["nav__link"]);
    this.winnersLink = createLinkElement("Winners", "#winners", ["nav__link"]);

    this.nav.append(this.garageLink, this.winnersLink);
  }

  public onChangeActiveNav = (page: Pages): void => {
    if (page === Pages.GARAGE) {
      this.garageLink.classList.add("active");
      this.winnersLink.classList.remove("active");
    } else {
      this.garageLink.classList.remove("active");
      this.winnersLink.classList.add("active");
    }
  };
}
