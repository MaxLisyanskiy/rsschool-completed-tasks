import { GameLevelResult, GameLevelResultStorage, SidebarActionType, StateLevels } from "./types";

import AppViewer from "./components/AppViewer/AppViewer";

export default class Game {
  levels: StateLevels[];
  currentLevel: number;
  AppViewer: AppViewer;

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.AppViewer = new AppViewer(this.levels, this.currentLevel);
  }

  private handleChangeStorage = (level: number, levelResult: GameLevelResult): void => {
    const storage: string | null = localStorage.getItem("_gameLevelResults");

    if (storage) {
      const parsingObj: GameLevelResultStorage = JSON.parse(storage);
      if (!parsingObj[`${level}`] || parsingObj[`${level}`]?.result !== levelResult) {
        const result = { ...parsingObj, [level]: { result: levelResult } };
        localStorage.setItem("_gameLevelResults", JSON.stringify(result));
      }
    } else {
      const levelResultObj = { [level]: { result: levelResult } };
      localStorage.setItem("_gameLevelResults", JSON.stringify(levelResultObj));
    }
  };

  private handleShowTooltip = (e: MouseEvent): void => {
    const elementsTable: HTMLElement[] = Array.from(this.AppViewer.AppMain.phone.querySelectorAll("*"));

    if (e.target instanceof HTMLElement) {
      const index = elementsTable.indexOf(e.target);

      if (e.type === "mouseover") {
        this.AppViewer.AppTooltip.onShowTooltip("block", elementsTable[index]);
      }
      if (e.type === "mouseout") {
        this.AppViewer.AppTooltip.onShowTooltip("none", elementsTable[index]);
      }
    }
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
          this.currentLevel += 1;
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

    localStorage.setItem("_currentLevel", JSON.stringify(this.currentLevel));
  };

  private handleCheckSubmit = (value: string) => {
    if (value === this.levels[this.currentLevel].cssSelector) {
      this.AppViewer.AppMain.phone.querySelectorAll("*").forEach((item) => {
        if (item.nodeType === 1) {
          if (item.closest(this.levels[this.currentLevel].cssSelector)) {
            item.classList.add("fading");
          }
        }
      });
      setTimeout(() => {
        this.handleChangeStorage(this.currentLevel, GameLevelResult.DONE);
        this.currentLevel++;
        this.createNewGame();
      }, 1000);
    } else {
      const editor = document.querySelector(".editor");
      if (editor) {
        editor.classList.add("shaking");
        setTimeout(() => {
          editor.classList.remove("shaking");
        }, 1000);
      }
    }
  };

  private createNewGame = () => {
    console.log("hi", this.currentLevel);
    this.AppViewer.createGameView(this.levels, this.currentLevel);
    this.AppViewer.AppSidebar.setActionsForList(this.handleChangeLevel);
  };

  public initNewGame = () => {
    this.AppViewer.createDom();
    this.createNewGame();
    this.AppViewer.AppSidebar.setActionsForArrow(this.handleChangeLevel);
    this.AppViewer.AppMain.setActions(this.handleShowTooltip, this.handleCheckSubmit);
  };
}
