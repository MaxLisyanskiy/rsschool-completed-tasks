import AppViewer from "./components/AppViewer/AppViewer";
import { StateLevels } from "./types";

export default class Game extends AppViewer {
  levels: StateLevels[];
  currentLevel: number;

  constructor(levels: StateLevels[], currentLevel: number) {
    super(levels, currentLevel);
    this.levels = levels;
    this.currentLevel = currentLevel;
  }

  public initNewGame = () => {
    console.log(this);
  };
}
