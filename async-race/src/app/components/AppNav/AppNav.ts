import "./AppNav.scss";
import AppLink from "../AppLink/AppLink";
import { createElement } from "../../../utils/createFunctions";

export default class AppNav {
  public nav: HTMLElement;
  private garageLink: AppLink;
  private winnersLink: AppLink;

  constructor() {
    this.nav = createElement("nav", ["nav"]);

    this.garageLink = new AppLink("Garage", "#/garage", ["nav__link"]);
    this.winnersLink = new AppLink("Winners", "#/winner", ["nav__link"]);

    this.nav.append(this.garageLink.link, this.winnersLink.link);
  }
}
