import "./AppTable.scss";
import { createElement, createCarSvg } from "../../../utils/createFunctions";
import { IWinner, CarInfo, IWinnersTableData } from "../../types/apiTypes";

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
    this.headTime = createElement("th", ["table-head__item"], "Best time ↕️", this.sortTableByTime);

    trWrapp.append(num, car, model, this.headWins, this.headTime);

    this.head.append(trWrapp);
  };

  private createTableBodyRow = (index: number, winnerData: IWinner, carData: CarInfo): void => {
    const trWrapp = createElement("tr", ["table-body__wrapp"]);
    const num = createElement("td", ["table-body__item"], `${index}`);
    const car = createElement("td", ["table-body__item"], "");
    const model = createElement("td", ["table-body__item"], `${carData.name}`);
    const wins = createElement("td", ["table-body__item"], `${winnerData.wins}`);
    const time = createElement("td", ["table-body__item"], `${winnerData.time}`);

    car.append(createCarSvg(carData.color, "table-body__item-img"));
    trWrapp.append(num, car, model, wins, time);
    this.body.append(trWrapp);
  };

  private sortTableByWins = (): void => {};
  private sortTableByTime = (): void => {};

  public updateTableBody = (tableData: IWinnersTableData[]): void => {
    this.body.innerHTML = "";

    if (tableData.length > 0) {
      tableData.forEach((item, index) => {
        const { winnerData, carData } = item;
        this.createTableBodyRow(index, winnerData, carData);
      });
    } else {
      this.body.innerHTML = "Not found winner";
    }
  };
}
