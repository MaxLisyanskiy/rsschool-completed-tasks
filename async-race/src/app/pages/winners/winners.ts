import "./winners.scss";
import { createElement, createTextElement } from "../../../utils/createFunctions";
import AppTable from "../../components/AppTable/AppTable";

export default class Winners {
  public page: HTMLElement;
  private title: HTMLElement;
  private subtitle: HTMLElement;
  private table: AppTable;
  //   private paginations: HTMLElement;

  constructor() {
    this.page = createElement("section", ["winners"]);
    this.title = createTextElement("h2", "winners__title", "Winners");
    this.subtitle = createTextElement("h3", "winners__subtitle", "Page #1");
    this.table = new AppTable();

    this.page.append(this.title, this.subtitle, this.table.table);
  }
}
