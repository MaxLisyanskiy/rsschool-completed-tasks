import { createTextElement } from "../AppSidebar/utils";
import "./AppMain.scss";

export default class AppMain {
  title: HTMLElement = document.createElement("h1");
  macSection: HTMLElement = document.createElement("section");

  createPhoneSection(): HTMLElement {
    const phoneSection = document.createElement("section");
    phoneSection.classList.add("mac");

    this.title = createTextElement("h1", "mac__title", "Select the plates");

    const mac = document.createElement("div");

    phoneSection.append(this.title, mac);

    return phoneSection;
  }

  getHtmlElement(): HTMLElement {
    const main = document.createElement("main");
    main.classList.add("main");
    main.append(this.createPhoneSection());
    return main;
  }
}
