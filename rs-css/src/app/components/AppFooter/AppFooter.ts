import { createElement } from "../utils";
import "./AppFooter.scss";

export default class AppFooter {
  createLink(className: string, href: string, text: string): HTMLAnchorElement {
    const link = document.createElement("a");
    link.classList.add(className);
    link.href = href;
    link.target = "_blank";
    link.innerHTML = text;
    return link;
  }

  getHtmlElement(): HTMLElement {
    const footer = createElement("footer", "footer");
    const footerWrapp = createElement("div", "footer__wrapp");
    footerWrapp.append(
      this.createLink("footer__school", "https://rs.school/", ""),
      this.createLink(
        "footer__task",
        "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rs-css.md",
        "© 2023 RS-CSS-TASK",
      ),
      this.createLink("footer__git", "https://github.com/MaxLisyanskiy", "Made by @MaxLisyanskiy"),
    );
    footer.append(footerWrapp);
    return footer;
  }
}
