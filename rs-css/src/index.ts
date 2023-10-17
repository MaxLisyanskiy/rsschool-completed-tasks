import "./scss/style.scss";
import App from "./app/App";
import { LEVELS } from "./app/levelsData";
import type { GameResults } from "./app/types";

window.addEventListener("load", () => {
  const currentLevel: number = Number(localStorage.getItem("_currentLevel")) || 0;
  const gameResults: GameResults = JSON.parse(localStorage.getItem("_gameLevelResults") || "null");

  const app: App = new App(LEVELS, currentLevel, gameResults);
  app.init();
});
