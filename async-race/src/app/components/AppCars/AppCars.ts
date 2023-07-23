import "./AppCars.scss";
import { createElement } from "../../../utils/createFunctions";
import { CarInfo } from "../../types/apiTypes";
import AppCar from "../AppCar/AppCar";

export default class AppCars {
  public cars: HTMLElement;

  public onDeleteCar!: (id: number) => void;
  public onSelectCar!: (id: number, name: string, color: string) => void;

  constructor() {
    this.cars = createElement("ul", ["cars"], "");
  }

  public updateCarsTable = (carsData: CarInfo[]): void => {
    this.cars.innerHTML = "";

    if (carsData.length > 0) {
      carsData.forEach(({ name, color, id }) => {
        const car = new AppCar(name, color, id);
        car.onDeleteCar = (id: number) => this.onDeleteCar(id);
        car.onSelectCar = (id: number, name: string, color: string) => this.onSelectCar(id, name, color);
        this.cars.append(car.car);
      });
    }
  };
}
