// import HeaderView from "./view/header/header-view";
// import FooterView from "./view/footer/footer-view";
// import MainView from "./view/main/main-view";

import AppFooter from "./components/AppFooter/AppFooter";

export default class App {
  init(): void {
    // const main = new MainView();
    // const header = new HeaderView(main);
    const footer = new AppFooter();
    // document.body.append(header.getHtmlElement(), main.getHtmlElement(), footer.getHtmlElement());

    const container = document.createElement("main");
    container.classList.add("main");
    document.body.prepend(footer.getHtmlElement());
  }
}
