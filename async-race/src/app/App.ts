import { createElement } from "../utils/createFunctions";
import AppNav from "./components/AppNav/AppNav";
import Winners from "./pages/winners/winners";

export default class App {
  private main: HTMLElement;
  private AppNav: AppNav;
  private Winners: Winners;

  constructor() {
    this.main = createElement("main", ["container"]);
    this.AppNav = new AppNav();
    this.Winners = new Winners();
  }

  init = (): void => {
    this.main.append(this.AppNav.nav, this.Winners.page);
    document.body.append(this.main);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get("page"));
  };
}
