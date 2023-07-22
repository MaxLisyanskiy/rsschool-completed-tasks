import { createElement } from "../utils/createFunctions";
import AppNav from "./components/AppNav/AppNav";
import GaragePage from "./pages/garage/garage";
import WinnersPage from "./pages/winners/winners";
import { Pages } from "./types";

export default class App {
  private main: HTMLElement;
  private currentPage: HTMLElement;
  private AppNav: AppNav;
  private WinnersPage: WinnersPage;
  private GaragePage: GaragePage;

  constructor() {
    this.main = createElement("div", ["container"]);
    this.currentPage = createElement("main", ["main"]);
    this.AppNav = new AppNav();
    this.WinnersPage = new WinnersPage();
    this.GaragePage = new GaragePage();

    window.addEventListener("hashchange", () => this.checkHash());
  }

  private showPage = (page = Pages.GARAGE): void => {
    if (page === Pages.WINNERS) {
      this.WinnersPage.updateWinnersPage();
      this.currentPage.innerHTML = "";
      this.currentPage.append(this.WinnersPage.page);
    } else {
      this.GaragePage.updateGaragePage();
      this.currentPage.innerHTML = "";
      this.currentPage.append(this.GaragePage.page);
    }

    this.AppNav.onChangeActiveNav(page);
  };

  private checkHash = (): void => {
    const urlHash = window.location.hash.split("#")[1];
    urlHash ? this.showPage(urlHash as Pages) : this.showPage();
  };

  public init = (): void => {
    this.main.append(this.AppNav.nav, this.currentPage);
    document.body.append(this.main);

    this.checkHash();
  };
}
