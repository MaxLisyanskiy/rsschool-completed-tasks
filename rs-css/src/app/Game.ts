import { SidebarActionType, StateLevels } from "./types";

import AppViewer from "./components/AppViewer/AppViewer";
import AppMain from "./components/AppMain/AppMain";
import AppSidebar from "./components/AppSidebar/AppSidebar";

export default class Game {
  levels: StateLevels[];
  currentLevel: number;
  AppViewer: AppViewer;
  AppMain: AppMain;
  AppSidebar: AppSidebar;

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.AppViewer = new AppViewer(this.levels, this.currentLevel);
    this.AppMain = new AppMain(levels, currentLevel);
    this.AppSidebar = new AppSidebar(levels, currentLevel);
  }

  createNewGame = () => {
    this.AppViewer.createGameView(this.levels, this.currentLevel);
    this.AppSidebar.setActions(this.handleChangeLevel);
  };

  handleChangeLevel = (type: SidebarActionType, level?: string): void => {
    switch (type) {
      case SidebarActionType.PREV:
        if (this.currentLevel !== 0) {
          this.currentLevel -= 1;
          this.createNewGame();
        }
        break;
      case SidebarActionType.NEXT: {
        if (this.currentLevel < this.levels.length - 1) {
          this.currentLevel++;
          this.createNewGame();
        }
        break;
      }
      case SidebarActionType.LIST: {
        this.currentLevel = Number(level);
        this.createNewGame();
        break;
      }
    }
  };

  private setActions = () => {
    this.AppSidebar.setActions(this.handleChangeLevel);
  };

  public initNewGame = () => {
    const { AppMain, AppSidebar } = this.AppViewer.createDom();
    this.AppMain = AppMain;
    this.AppSidebar = AppSidebar;
    // this.createNewGame();
    this.setActions();
  };
}
