export default class AppLink {
  public link: HTMLAnchorElement;
  public onClick: (() => void) | null = null;

  constructor(text: string, href: string, styles: string[] = []) {
    this.link = document.createElement("a");
    this.link.innerText = text;
    this.link.setAttribute("href", href);
    this.link.classList.add(...styles);
    this.link.addEventListener("click", () => this.onClick?.());
  }
}
