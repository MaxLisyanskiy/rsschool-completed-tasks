import AppHeader from "./components/AppHeader/AppHeader";

export default class App {
  private AppHeader: AppHeader;

  constructor() {
    this.AppHeader = new AppHeader();
  }

  init = (): void => {
    document.body.prepend(this.AppHeader.header);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get("page"));
  };
}
