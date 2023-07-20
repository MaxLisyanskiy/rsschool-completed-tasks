import "./AppTable.scss";
import { createElement } from "../../../utils/createFunctions";

export default class AppTable {
  public table: HTMLElement;
  private head: HTMLElement;
  private headWins!: HTMLElement;
  private headTime!: HTMLElement;
  private body: HTMLElement;

  constructor() {
    this.table = createElement("table", ["table"]);
    this.head = createElement("thead", ["table-head"]);
    this.body = createElement("tbody", ["table-body"]);
    this.createTableHeadActions();

    this.table.append(this.head, this.body);
  }

  private createTableHeadActions = (): void => {
    const trWrapp = createElement("tr", ["table-head__wrapp"]);
    const num = createElement("th", ["table-head__item"], "№");
    const car = createElement("th", ["table-head__item"], "Car");
    const model = createElement("th", ["table-head__item"], "Model");
    this.headWins = createElement("th", ["table-head__item"], "Wins ↕️", this.sortTableByWins);
    this.headTime = createElement("th", ["table-head__item"], "Best time ↕️");

    trWrapp.append(num, car, model, this.headWins, this.headTime);

    this.head.append(trWrapp);
  };

  private sortTableByWins = () => {};
}
