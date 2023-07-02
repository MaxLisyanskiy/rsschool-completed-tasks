import "./AppTooltip.scss";

import { createElement } from "../utils";

export default class AppTooltip {
  tooltip: HTMLElement = createElement("div", "tooltip");

  public onShowTooltip(display: string, elem: HTMLElement): void {
    this.tooltip.style.display = display;

    if (display === "block") {
      this.tooltip.innerHTML = `
      &lt;${elem.tagName.toLocaleLowerCase()}&gt;&lt;/${elem.tagName.toLocaleLowerCase()}&gt;`;
      this.tooltip.style.left = `${elem.getClientRects()[0].x}px`;
      this.tooltip.style.top = `${elem.getClientRects()[0].y - 20}px`;
    }
  }

  public getHtmlElement(): HTMLElement {
    this.tooltip = createElement("div", "tooltip");
    return this.tooltip;
  }
}
