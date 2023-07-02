import { StateLevels } from "./types";

import Game from "./Game";

export default class App {
  levels: StateLevels[];
  currentLevel: number;

  constructor(state: StateLevels[]) {
    this.levels = state;
    this.currentLevel = Number(localStorage.getItem("_currentLevel")) || 0;
  }

  init = (): void => {
    const game = new Game(this.levels, this.currentLevel);
    game.initNewGame();
  };
}
