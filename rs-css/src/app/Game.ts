import AppFooter from "./components/AppFooter/AppFooter";
import AppMain from "./components/AppMain/AppMain";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import AppViewer from "./components/AppViewer/AppViewer";
import { StateLevels } from "./types";

export default class Game {
  levels: StateLevels[];
  currentLevel: number;
  main: AppMain;
  sidebar: AppSidebar | null = null;
  footer: AppFooter | null = null;

  constructor(levels: StateLevels[], currentLevel: number) {
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.main = new AppMain(levels, currentLevel);
    this.sidebar = new AppSidebar(levels, currentLevel);
    this.footer = new AppFooter();
  }

  createNewGame() {
    this.main.phone.innerHTML = this.levels[this.currentLevel].code;
  }

  handleChangeLevel = (type: string, level?: string): void => {
    this.currentLevel++;
    this.createNewGame();
  };

  private setActions() {
    this.sidebar?.setActions(this.handleChangeLevel);
  }

  public initNewGame = () => {
    const viewer = new AppViewer(this.levels, this.currentLevel);
    const { main, sidebar, footer } = viewer.createDom();
    this.main = main;
    this.sidebar = sidebar;
    this.footer = footer;
    this.createNewGame();
    this.setActions();
  };
}
