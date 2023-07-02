import AppMain from "../AppMain/AppMain";
import AppSidebar from "../AppSidebar/AppSidebar";
import AppFooter from "../AppFooter/AppFooter";

import { createElement } from "../utils";
import { StateLevels } from "../../types";

export default class AppViewer {
  levels: StateLevels[];
  currentLevel: number;
  // main: AppMain;
  // sidebar: AppSidebar;
  // footer: AppFooter;

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    // this.main = new AppMain(levels, currentLevel);
    // this.sidebar = new AppSidebar(levels, currentLevel);
    // this.footer = new AppFooter();
  }

  createDom = (): { main: AppMain; sidebar: AppSidebar; footer: AppFooter } => {
    const main = new AppMain(this.levels, this.currentLevel);
    const sidebar = new AppSidebar(this.levels, this.currentLevel);
    const footer = new AppFooter();
    const container = createElement("div", "container");
    container.prepend(main.getHtmlElement(), sidebar.getHtmlElement());
    document.body.prepend(container, footer.getHtmlElement());
    return { main, sidebar, footer };
  };
}
