import "./garage.scss";
import ApiController from "../../services/api";
import { AppState } from "../../components/AppState";

import AppForm from "../../components/AppForm/AppForm";
import AppActionBtns from "../../components/AppActionBtns/AppActionBtns";
import AppCarsTable from "../../components/AppCars/AppCars";
import AppPagination from "../../components/AppPagination/AppPagination";

import { CreateRandomCar } from "../../types";
import { createArrayWithNewRandomCars, createElement, createTextElement } from "../../../utils/createFunctions";

export default class GaragePage extends ApiController {
  public page: HTMLElement;
  private title: HTMLElement;
  private subtitle: HTMLElement;
  private wonRacingTitle: HTMLElement;
  private form: AppForm;
  private actionBtns: AppActionBtns;
  private carsTable: AppCarsTable;
  private paginations: AppPagination;
  private pageNum: number = 1;
  private itemsLimit: number = 10;

  constructor() {
    super();
    this.page = createElement("section", ["page", "garage"]);
    this.title = createTextElement("h2", "page__title", "Garage");
    this.subtitle = createTextElement("h3", "page__subtitle", "Page");
    this.wonRacingTitle = createElement("p", ["page__won-title", "hidden"], "Car won in 1 seconds!");

    this.form = new AppForm();
    this.actionBtns = new AppActionBtns();
    this.carsTable = new AppCarsTable();
    this.paginations = new AppPagination();

    this.form.onCreateCar = (name: string, color: string) => this.handleCreateNewCar(name, color);
    this.actionBtns.onStartRacing = () => this.handleStartRacing();
    this.actionBtns.onResetRacing = () => this.handleResetRacing();
    this.actionBtns.onGenerateNewCars = () => this.handleGenerateNewCars();
    this.carsTable.onDeleteCar = (id: number) => this.handleDeleteCar(id);
    this.carsTable.onSelectCar = (id: number, name: string, color: string) => this.handleSelectCar(id, name, color);
    this.paginations.onChangePage = (page: number) => this.handleChangePage(page);

    const toolsWrapp = createElement("div", ["garage-tools"]);
    toolsWrapp.append(this.title, this.subtitle, this.form.form, this.actionBtns.buttons);

    this.page.append(toolsWrapp, this.paginations.paginations, this.carsTable.cars, this.wonRacingTitle);

    document.body.addEventListener("wonRacing", ((e: CustomEvent) => {
      this.wonRacingTitle.innerHTML = `${e.detail.name} (${e.detail.id}) won in ${e.detail.time} seconds!`;
      this.wonRacingTitle.classList.remove("hidden");
      setTimeout(() => {
        this.wonRacingTitle.classList.add("hidden");
        this.wonRacingTitle.innerHTML = "";
      }, 5000);
    }) as EventListener);
  }

  private handleCreateNewCar = async (name: string, color: string) => {
    await this.createCar(name, color);
    await this.updateGaragePage();
  };

  private changeActionsBtnAndAppStore(value: boolean): void {
    this.actionBtns.raceBtn.disabled = value ? true : false;
    this.actionBtns.resetBtn.disabled = value ? false : true;

    AppState.isRacing = true;
    AppState.winnerId = 0;
    AppState.winnerTime = 0;
  }

  private handleStartRacing = async (): Promise<void> => {
    this.changeActionsBtnAndAppStore(true);
    this.carsTable.carsData.map(async (carObj) => await carObj.handleStartDrive());
  };

  private handleResetRacing = async (): Promise<void> => {
    this.wonRacingTitle.classList.add("hidden");
    this.changeActionsBtnAndAppStore(false);
    this.carsTable.carsData.map(async (carObj) => await carObj.handleStopDrive());
  };

  private handleGenerateNewCars = async (): Promise<void> => {
    this.actionBtns.onGenerateLoading(true);
    for (let i = 0; i < 100; i++) {
      const { newCarName, newCarColor }: CreateRandomCar = createArrayWithNewRandomCars();
      await this.createCar(newCarName, newCarColor);
    }
    this.actionBtns.onGenerateLoading(false);
    await this.updateGaragePage();
  };

  private handleDeleteCar = async (id: number): Promise<void> => {
    await this.deleteCar(id);
    await this.updateGaragePage();
  };

  private handleUpdateCar = async (id: number, name: string, color: string): Promise<void> => {
    await this.updateCar(id, name, color);
    await this.updateGaragePage();
  };

  private handleSelectCar = async (id: number, name: string, color: string): Promise<void> => {
    this.form.addSelectedCarData(id, name, color, this.handleUpdateCar);
  };

  private handleChangePage = async (page: number): Promise<void> => {
    this.pageNum = page;
    await this.updateGaragePage();
  };

  public async updateGaragePage(): Promise<void> {
    if (AppState.isRacing) this.handleResetRacing();
    const { items, count } = await this.getCars(this.pageNum, this.itemsLimit);

    this.title.innerHTML = `Garage (${count})`;
    this.subtitle.innerHTML = `Page #${this.pageNum}`;

    this.carsTable.updateCarsTable(items);
    this.paginations.updatePaginations(this.pageNum, this.itemsLimit, count);
  }
}
