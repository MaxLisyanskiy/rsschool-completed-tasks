import { createElement } from "../../../utils/createFunctions";

export default class AppLink {
  public link: HTMLElement;
  public onClick: (() => void) | null = null;

  constructor(text: string, href: string, styles: string[] = []) {
    this.link = createElement("a", styles, text, () => this.onClick?.());
    // this.link.innerText = text;
    this.link.setAttribute("href", href);
    // this.link.classList.add(...styles);
    // this.link.addEventListener("click", );
  }
}
