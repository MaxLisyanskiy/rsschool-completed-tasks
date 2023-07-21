import "./winners.scss";
import { createElement, createTextElement } from "../../../utils/createFunctions";
import AppTable from "../../components/AppTable/AppTable";
import ApiController from "../../services/api";
import { IWinner, IWinnerCarInfo, IWinnersTableData, WinnersOrder, WinnersSort } from "../../types/winnerTypes";

export default class WinnersPage extends ApiController {
  public page: HTMLElement;
  private title: HTMLElement;
  private subtitle: HTMLElement;
  private table: AppTable;
  //   private paginations: HTMLElement;
  private pageNum: number = 1;
  private itemsLimit: number = 10;
  private sort: WinnersSort = WinnersSort.WINS;
  private order: WinnersOrder = WinnersOrder.DESC;

  constructor() {
    super();
    this.page = createElement("section", ["winners"]);
    this.title = createTextElement("h2", "winners__title", "Winners");
    this.subtitle = createTextElement("h3", "winners__subtitle", "Page");
    this.table = new AppTable();

    this.page.append(this.title, this.subtitle, this.table.table);
  }

  public async updateWinnersPage() {
    const { items, count } = await this.getWinners();

    this.title.innerHTML = `Winners (${count})`;
    this.subtitle.innerHTML = `Page #${this.pageNum}`;

    const tableData: IWinnersTableData[] = [];

    items.forEach(async (winnerData: IWinner, index: number) => {
      const carData = await this.getWinnerCarInfo(winnerData.id);
      tableData.push({ winnerData, carData });

      if (index === items.length - 1) {
        this.table.updateTableBody(tableData);
      }
    });
  }
}
