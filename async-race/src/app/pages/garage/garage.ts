import { createElement, createTextElement } from "../../../utils/createFunctions";
import AppForm from "../../components/AppForm/AppForm";
import ApiController from "../../services/api";

export default class GaragePage extends ApiController {
  public page: HTMLElement;
  private title: HTMLElement;
  private subtitle: HTMLElement;
  private form: AppForm;
  //   private paginations: HTMLElement;
  private pageNum: number = 1;
  private itemsLimit: number = 10;

  constructor() {
    super();
    this.page = createElement("section", ["page", "garage"]);
    this.title = createTextElement("h2", "page__title", "Garage");
    this.subtitle = createTextElement("h3", "page__subtitle", "Page");

    this.form = new AppForm();

    this.page.append(this.title, this.subtitle, this.form.form);
  }

  //   public async updateWinnersPage() {
  //     const { items, count } = await this.getWinners();

  //     this.title.innerHTML = `Winners (${count})`;
  //     this.subtitle.innerHTML = `Page #${this.pageNum}`;

  //     const tableData: IWinnersTableData[] = [];

  //     items.forEach(async (winnerData: IWinner, index: number) => {
  //       const carData = await this.getWinnerCarInfo(winnerData.id);
  //       tableData.push({ winnerData, carData });

  //       if (index === items.length - 1) {
  //         this.table.updateTableBody(tableData);
  //       }
  //     });
  //   }
}
