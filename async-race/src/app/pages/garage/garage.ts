import { createElement, createTextElement } from "../../../utils/createFunctions";
import AppActionBtns from "../../components/AppActionBtns/AppActionBtns";
import AppCarsTable from "../../components/AppCars/AppCars";
import AppForm from "../../components/AppForm/AppForm";
import ApiController from "../../services/api";

export default class GaragePage extends ApiController {
  public page: HTMLElement;
  private title: HTMLElement;
  private subtitle: HTMLElement;
  private form: AppForm;
  private actionBtns: AppActionBtns;
  private carsTable: AppCarsTable;
  //   private paginations: HTMLElement;
  private pageNum: number = 1;
  private itemsLimit: number = 10;

  constructor() {
    super();
    this.page = createElement("section", ["page", "garage"]);
    this.title = createTextElement("h2", "page__title", "Garage");
    this.subtitle = createTextElement("h3", "page__subtitle", "Page");

    this.form = new AppForm();
    this.actionBtns = new AppActionBtns();
    this.carsTable = new AppCarsTable();

    this.page.append(this.title, this.subtitle, this.form.form, this.actionBtns.buttons, this.carsTable.cars);
  }

  public async updateGaragePage() {
    const { items, count } = await this.getCars();

    this.title.innerHTML = `Garage (${count})`;
    this.subtitle.innerHTML = `Page #${this.pageNum}`;

    this.carsTable.updateCarsTable(items);

    // const tableData: IWinnersTableData[] = [];

    // items.forEach(async (winnerData: IWinner, index: number) => {
    //   const carData = await this.getWinnerCarInfo(winnerData.id);
    //   tableData.push({ winnerData, carData });

    //   if (index === items.length - 1) {
    //     this.table.updateTableBody(tableData);
    //   }
    // });
  }
}
