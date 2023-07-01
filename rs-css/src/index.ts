import "./scss/style.scss";
import App from "./app/App";
import { levels } from "./app/levels";

window.addEventListener("load", () => {
  const app: App = new App(levels);
  app.init();
});
