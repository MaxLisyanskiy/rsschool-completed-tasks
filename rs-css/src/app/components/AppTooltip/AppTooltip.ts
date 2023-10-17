import "./AppTooltip.scss";

import { createElement, getTagAttributes } from "../utils";

export default class AppTooltip {
  tooltip: HTMLElement = createElement("div", "tooltip");

  public onShowTooltip(display: string, elem: HTMLElement): void {
    this.tooltip.style.display = display;

    if (display === "block") {
      const tagName = elem.tagName.toLocaleLowerCase();

      this.tooltip.innerHTML = `
        &lt;${tagName}${getTagAttributes(elem)}&gt;&lt;/${tagName}&gt;
      `;

      this.tooltip.style.left = `${elem.getClientRects()[0].x}px`;
      this.tooltip.style.top = `${elem.getClientRects()[0].y - 30}px`;
    }
  }

  public getHtmlElement(): HTMLElement {
    this.tooltip = createElement("div", "tooltip");
    return this.tooltip;
  }
}
