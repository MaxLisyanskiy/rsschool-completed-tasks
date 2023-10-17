import "./scss/style.scss";
import App from "./app/App";

window.addEventListener("load", () => {
  const app: App = new App();
  app.init();
});
