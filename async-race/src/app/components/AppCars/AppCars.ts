import "./AppCars.scss";
import { createElement } from "../../../utils/createFunctions";
import { CarInfo } from "../../types/apiTypes";
import AppCar from "../AppCar/AppCar";

export default class AppCars {
  public cars: HTMLElement;

  constructor() {
    this.cars = createElement("ul", ["cars"], "");
  }

  public updateCarsTable = (carsData: CarInfo[]): void => {
    if (carsData.length > 0) {
      carsData.forEach(({ name, color, id }) => {
        const car = new AppCar(name, color, id);
        this.cars.append(car.car);
      });
    }
  };
}
