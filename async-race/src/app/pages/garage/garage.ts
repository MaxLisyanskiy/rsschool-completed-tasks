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

    this.form.onCreateCar = (name: string, color: string) => this.handleCreateNewCar(name, color);
    this.actionBtns.onGenerateNewCars = () => this.handleGenerateNewCars();

    this.carsTable.onDeleteCar = (id: number) => this.handleDeleteCar(id);
    this.carsTable.onSelectCar = (id: number, name: string, color: string) => this.handleSelectCar(id, name, color);

    this.page.append(this.title, this.subtitle, this.form.form, this.actionBtns.buttons, this.carsTable.cars);
  }

  private async handleCreateNewCar(name: string, color: string) {
    await this.createCar(name, color);
    await this.updateGaragePage();
  }

  private async handleGenerateNewCars() {
    this.actionBtns.onGenerateLoading(true);
    for (let i = 0; i < 100; i++) {
      const { newCarName, newCarColor }: CreateRandomCar = createArrayWithNewRandomCars();
      await this.createCar(newCarName, newCarColor);
    }
    this.actionBtns.onGenerateLoading(false);
    await this.updateGaragePage();
  }

  private async handleDeleteCar(id: number) {
    await this.deleteCar(id);
    await this.updateGaragePage();
  }

  private handleUpdateCar = async (id: number, name: string, color: string) => {
    await this.updateCar(id, name, color);
    await this.updateGaragePage();
  };

  private async handleSelectCar(id: number, name: string, color: string) {
    this.form.addSelectedCarData(id, name, color, this.handleUpdateCar);
  }

  public async updateGaragePage() {
    const { items, count } = await this.getCars();

    this.title.innerHTML = `Garage (${count})`;
    this.subtitle.innerHTML = `Page #${this.pageNum}`;

    this.carsTable.updateCarsTable(items);
  }
}
