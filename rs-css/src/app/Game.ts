import { SidebarActionType, StateLevels } from "./types";

import AppViewer from "./components/AppViewer/AppViewer";
import AppMain from "./components/AppMain/AppMain";
import AppSidebar from "./components/AppSidebar/AppSidebar";

export default class Game {
  levels: StateLevels[];
  currentLevel: number;
  AppViewer: AppViewer;

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.AppViewer = new AppViewer(this.levels, this.currentLevel);
  }

  private handleShowTooltip = (e: MouseEvent): void => {
    console.log(e);
  };

  private handleChangeLevel = (type: SidebarActionType, level?: string): void => {
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

  private createNewGame = () => {
    this.AppViewer.createGameView(this.levels, this.currentLevel);
    this.AppViewer.AppSidebar.setActions(this.handleChangeLevel);
    this.AppViewer.AppMain.setActions(this.handleShowTooltip);
  };

  public initNewGame = () => {
    this.AppViewer.createDom();
    this.createNewGame();
  };
}
