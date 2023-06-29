import AppMain from "./components/AppMain/AppMain";
import AppSidebar from "./components/AppSidebar/AppSidebar";
import AppFooter from "./components/AppFooter/AppFooter";

export default class App {
  init(): void {
    const main = new AppMain();
    const sidebar = new AppSidebar();
    const footer = new AppFooter();

    const container = document.createElement("div");
    container.classList.add("container");
    container.prepend(main.getHtmlElement(), sidebar.getHtmlElement());
    document.body.prepend(container, footer.getHtmlElement());
  }
}
