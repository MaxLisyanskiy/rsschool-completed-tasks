import { StateLevels } from "./types";

export default class State {
  levels: StateLevels[];
  currentLevel: number = 0;

  constructor(state: StateLevels[]) {
    this.levels = state;
  }
}
