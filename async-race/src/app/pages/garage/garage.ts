import { createArrayWithNewRandomCars, createElement, createTextElement } from "../../../utils/createFunctions";
import AppActionBtns from "../../components/AppActionBtns/AppActionBtns";
import AppCarsTable from "../../components/AppCars/AppCars";
import AppForm from "../../components/AppForm/AppForm";
import ApiController from "../../services/api";
import { CreateRandomCar } from "../../types";

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

    this.form.onCreateCar = (name: string, color: string) => this.handleCreateCar(name, color);
    this.actionBtns.onGenerateNewCars = () => this.handleGenerateNewCars();

    this.page.append(this.title, this.subtitle, this.form.form, this.actionBtns.buttons, this.carsTable.cars);
  }

  private async handleCreateCar(name: string, color: string) {
    await this.createCar(name, color);
    await this.updateGaragePage();
  }

  private async handleGenerateNewCars() {
    this.actionBtns.onGenerateLoading(true);
    for (let i = 0; i < 100; i++) {
      const { newCarColor, newCarName }: CreateRandomCar = createArrayWithNewRandomCars();
      await this.createCar(newCarColor, newCarName);
    }
    this.actionBtns.onGenerateLoading(false);
    await this.updateGaragePage();
  }

  public async updateGaragePage() {
    const { items, count } = await this.getCars();

    this.title.innerHTML = `Garage (${count})`;
    this.subtitle.innerHTML = `Page #${this.pageNum}`;

    this.carsTable.updateCarsTable(items);
  }
}
