import State from "./State";
import { StateLevels } from "./types";

import AppMain from "./components/AppMain/AppMain";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import AppFooter from "./components/AppFooter/AppFooter";

export default class App extends State {
  constructor(state: StateLevels[]) {
    super(state);
    this.levels = state;
  }

  init(): void {
    const main = new AppMain(this.levels);
    const sidebar = new AppSidebar(this.levels);
    const footer = new AppFooter();

    const container = document.createElement("div");
    container.classList.add("container");
    container.prepend(main.getHtmlElement(), sidebar.getHtmlElement());
    document.body.prepend(container, footer.getHtmlElement());
  }
}
