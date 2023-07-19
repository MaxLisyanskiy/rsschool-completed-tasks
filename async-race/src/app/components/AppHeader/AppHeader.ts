import "./AppHeader.scss";
import AppLink from "../AppLink/AppLink";

export default class AppHeader {
  public header: HTMLElement;
  private garageLink: AppLink;
  private winnersLink: AppLink;

  constructor() {
    this.header = document.createElement("header");

    this.garageLink = new AppLink("Garage", "?page=garage", ["header__link"]);
    this.winnersLink = new AppLink("Winners", "?page=winner", ["header__link"]);

    this.header.append(this.garageLink.link, this.winnersLink.link);
  }
}
