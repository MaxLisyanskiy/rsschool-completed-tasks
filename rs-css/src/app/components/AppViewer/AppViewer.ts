import AppMain from "../AppMain/AppMain";
import AppSidebar from "../AppSidebar/AppSidebar";
import AppFooter from "../AppFooter/AppFooter";
import AppTooltip from "../AppTooltip/AppTooltip";

import { createElement } from "../utils";
import { StateLevels } from "../../types";

export default class AppViewer {
  levels: StateLevels[];
  currentLevel: number;
  AppMain: AppMain;
  AppSidebar: AppSidebar;
  AppFooter: AppFooter;
  AppTooltip: AppTooltip;

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.AppMain = new AppMain(levels, currentLevel);
    this.AppSidebar = new AppSidebar(levels, currentLevel);
    this.AppFooter = new AppFooter();
    this.AppTooltip = new AppTooltip();
  }

  public createGameView(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.AppSidebar.loadNewContent(levels, currentLevel);
    this.AppMain.loadNewContent(levels, currentLevel);
  }

  public createDom = (): void => {
    const container = createElement("div", "container");
    container.prepend(this.AppMain.getHtmlElement(), this.AppSidebar.getHtmlElement());
    document.body.prepend(container, this.AppFooter.getHtmlElement(), this.AppTooltip.getHtmlElement());
  };
}
