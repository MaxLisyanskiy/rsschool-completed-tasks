import { CarInfo, CarsData, IWinnersData, WinnersOrder, WinnersSort } from "../types/apiTypes";

export default class ApiController {
  baseApiUrl: string;
  winners: string;
  garage: string;
  basePage: number = 1;
  baseLimit: number = 10;

  constructor() {
    this.baseApiUrl = "http://localhost:3000";
    this.winners = `${this.baseApiUrl}/winners`;
    this.garage = `${this.baseApiUrl}/garage`;
  }

  async getWinners(
    page: number = this.basePage,
    limit: number = this.baseLimit,
    sort: WinnersSort = WinnersSort.WINS,
    order: WinnersOrder = WinnersOrder.DESC,
  ): Promise<IWinnersData> {
    const res = await fetch(`${this.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const items = await res.json();
    const count = res.headers.get("X-Total-Count");
    return { items, count };
  }

  async getWinnerCarInfo(id: number): Promise<CarInfo> {
    const res = await fetch(`${this.garage}/${id}`);
    const carInfo = await res.json();

    return carInfo;
  }

  async getCars(page = this.basePage, limit: number = this.baseLimit): Promise<CarsData> {
    const res = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    const items = await res.json();
    const count = res.headers.get("X-Total-Count");

    return { items, count };
  }

  async createCar(name: string, color: string): Promise<CarInfo> {
    const res = await fetch(this.garage, {
      method: "POST",
      body: JSON.stringify({ name, color }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.json();
  }
}
