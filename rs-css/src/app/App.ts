import type { GameResults, StateLevels } from "./types";

import GameController from "./components/GameController";

export default class App {
  levels: StateLevels[];
  currentLevel: number;
  gameResults: GameResults;

  constructor(state: StateLevels[], currentLevel: number, gameResults: GameResults) {
    this.levels = state;
    this.currentLevel = currentLevel;
    this.gameResults = gameResults;
  }

  init = (): void => {
    const game = new GameController(this.levels, this.currentLevel, this.gameResults);
    game.initNewGame();
  };
}
