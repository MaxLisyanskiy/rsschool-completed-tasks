import AppViewer from "./AppViewer";
import { GameLevelResult, GameResults, SidebarActionType, StateLevels } from "../types";

export default class GameController {
  levels: StateLevels[];
  currentLevel: number;
  gameResults: GameResults;
  isPrintingSelector: boolean = false;
  AppViewer: AppViewer;

  constructor(levels: StateLevels[], currentLevel: number, gameResults: GameResults) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.gameResults = gameResults;
    this.AppViewer = new AppViewer(levels, currentLevel, gameResults);
  }

  private handleChangeStorage = (level: number, levelResult: GameLevelResult): void => {
    if (this.gameResults) {
      if (!this.gameResults[`${level}`] || this.gameResults[`${level}`]?.result !== levelResult) {
        const result = { ...this.gameResults, [level]: { result: levelResult } };
        this.gameResults = result;
        localStorage.setItem("_gameLevelResults", JSON.stringify(result));
      }
    } else {
      const levelResultObj = { [level]: { result: levelResult } };
      this.gameResults = levelResultObj;
      localStorage.setItem("_gameLevelResults", JSON.stringify(levelResultObj));
    }
  };

  private handleShowTooltip = (e: MouseEvent): void => {
    const phoneNodes: HTMLElement[] = Array.from(this.AppViewer.AppMain.phone.querySelectorAll(".emoji"));
    const viewerNodes: HTMLElement[] = Array.from(this.AppViewer.AppMain.htmlViewer.querySelectorAll(".code"));

    if (e.target instanceof HTMLElement) {
      const index = e.target.closest(".emoji")
        ? phoneNodes.indexOf(e.target)
        : viewerNodes.indexOf(e.target.closest(".code") as HTMLElement);

      if (index !== -1 && e.type === "mouseover") {
        phoneNodes[index].classList.add("outline");
        viewerNodes[index].classList.add("highlite");
        this.AppViewer.AppTooltip.onShowTooltip("block", phoneNodes[index]);
      }
      if (index !== -1 && e.type === "mouseout") {
        phoneNodes[index].classList.remove("outline");
        viewerNodes[index].classList.remove("highlite");
        this.AppViewer.AppTooltip.onShowTooltip("none", phoneNodes[index]);
      }
    }
  };

  private handleChangeLevel = (type: SidebarActionType, level?: string): void => {
    if (!this.isPrintingSelector) {
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
    }
  };

  private handleShowHelpSelector = (): void => {
    if (!this.isPrintingSelector) {
      this.isPrintingSelector = true;

      this.AppViewer.AppMain.handlePrintSelector(this.levels[this.currentLevel].cssSelector, (res: string) => {
        if (res && res === "done") {
          this.isPrintingSelector = false;
          this.handleCheckSubmit(this.levels[this.currentLevel].cssSelector, GameLevelResult.HELP);
        }
      });
    }
  };

  private handleCheckSubmit = (value: string, type: GameLevelResult) => {
    if (!this.isPrintingSelector) {
      if (value === this.levels[this.currentLevel].cssSelector) {
        this.AppViewer.AppMain.phone.querySelectorAll("*").forEach((item) => {
          if (item.nodeType === 1) {
            if (item.closest(this.levels[this.currentLevel].cssSelector)) {
              item.classList.add("fading");
            }
          }
        });
        setTimeout(() => {
          this.handleChangeStorage(this.currentLevel, type);
          this.currentLevel += 1;
          localStorage.setItem(
            "_currentLevel",
            JSON.stringify(this.currentLevel < this.levels.length ? this.currentLevel : this.currentLevel - 1),
          );
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
    }
  };

  private resetGameLevels = () => {
    if (!this.isPrintingSelector) {
      this.currentLevel = 0;
      this.gameResults = null;
      localStorage.clear();
      this.createNewGame();
    }
  };

  private createNewGame = () => {
    if (this.currentLevel >= this.levels.length) {
      this.currentLevel -= 1;
      this.AppViewer.AppPopup.showPopup(this.gameResults);
    }

    this.AppViewer.createGameView(this.levels, this.currentLevel, this.gameResults);
    this.AppViewer.AppSidebar.setActionsForList(this.handleChangeLevel);
  };

  public initNewGame = () => {
    this.AppViewer.createDom();
    this.createNewGame();
    this.AppViewer.AppSidebar.setActionsForArrow(this.handleChangeLevel, this.resetGameLevels);
    this.AppViewer.AppMain.setActions(this.handleShowTooltip, this.handleCheckSubmit, this.handleShowHelpSelector);
    this.AppViewer.AppPopup.setActionsReset(this.resetGameLevels);
  };
}
