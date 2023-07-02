import { StateLevels } from "./types";

import AppViewer from "./components/AppViewer/AppViewer";
import Game from "./Game";

export default class App {
  levels: StateLevels[];
  currentLevel: number = 0;

  constructor(state: StateLevels[]) {
    this.levels = state;
  }

  init = (): void => {
    // const viewer = new AppViewer(this.levels, this.currentLevel);
    // viewer.createDom();
    const game = new Game(this.levels, this.currentLevel);
    game.initNewGame();
  };
}
