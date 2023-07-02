import AppMain from "../AppMain/AppMain";
import AppSidebar from "../AppSidebar/AppSidebar";
import AppFooter from "../AppFooter/AppFooter";

import { createElement } from "../utils";
import { StateLevels } from "../../types";

export default class AppViewer {
  levels: StateLevels[];
  currentLevel: number;
  AppMain: AppMain;
  AppSidebar: AppSidebar;
  AppFooter: AppFooter;

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.AppMain = new AppMain(levels, currentLevel);
    this.AppSidebar = new AppSidebar(levels, currentLevel);
    this.AppFooter = new AppFooter();
  }

  public createGameView(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.AppSidebar.loadNewContent(this.levels, this.currentLevel);
    this.AppMain.loadNewContent(this.levels, this.currentLevel);
  }

  public createDom = (): void => {
    const container = createElement("div", "container");
    container.prepend(this.AppMain.getHtmlElement(), this.AppSidebar.getHtmlElement());
    document.body.prepend(container, this.AppFooter.getHtmlElement());
  };
}
