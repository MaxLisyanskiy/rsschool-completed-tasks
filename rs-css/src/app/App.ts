// import HeaderView from "./view/header/header-view";
// import FooterView from "./view/footer/footer-view";
// import MainView from "./view/main/main-view";

import AppFooter from "./components/AppFooter/AppFooter";
import AppSidebar from "./components/AppSidebar/AppSidebar";

export default class App {
  init(): void {
    // const main = new MainView();
    // const header = new HeaderView(main);
    const sidebar = new AppSidebar();
    const footer = new AppFooter();
    // document.body.append(header.getHtmlElement(), main.getHtmlElement(), footer.getHtmlElement());

    const container = document.createElement("div");
    container.classList.add("container");
    container.prepend(sidebar.getHtmlElement(), footer.getHtmlElement());
    document.body.prepend(container);
  }
}
