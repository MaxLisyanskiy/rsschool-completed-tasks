import { createElement } from "../utils/createFunctions";
import AppNav from "./components/AppNav/AppNav";
import WinnersPage from "./pages/winners/winners";
import { Pages } from "./types";

export default class App {
  private main: HTMLElement;
  private currentPage: HTMLElement;
  private AppNav: AppNav;
  private WinnersPage: WinnersPage;

  constructor() {
    this.main = createElement("div", ["container"]);
    this.currentPage = createElement("main", ["main"]);
    this.AppNav = new AppNav();
    this.WinnersPage = new WinnersPage();
  }

  private showPage = (page = Pages.GARAGE): void => {
    if (page === Pages.WINNERS) {
      this.WinnersPage.updateWinnersPage();
      this.currentPage.innerHTML = "";
      this.currentPage.append(this.WinnersPage.page);
    } else {
      this.currentPage.innerHTML = "";
      this.currentPage.append();
    }
  };

  public init = (): void => {
    this.main.append(this.AppNav.nav, this.currentPage);
    document.body.append(this.main);

    const urlHash = window.location.hash.split("#")[1];
    urlHash ? this.showPage(urlHash as Pages) : this.showPage();
  };
}
