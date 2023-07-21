import { IWinnerCarInfo, IWinnersData, WinnersOrder, WinnersSort } from "../types/winnerTypes";

export default class ApiController {
  baseApiUrl: string;
  winners: string;
  garage: string;

  constructor() {
    this.baseApiUrl = "http://localhost:3000";
    this.winners = `${this.baseApiUrl}/winners`;
    this.garage = `${this.baseApiUrl}/garage`;
  }

  async getWinners(
    page: number = 1,
    limit: number = 10,
    sort: WinnersSort = WinnersSort.WINS,
    order: WinnersOrder = WinnersOrder.DESC,
  ): Promise<IWinnersData> {
    const res = await fetch(`${this.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const items = await res.json();
    const count = res.headers.get("X-Total-Count");
    return { items, count };
  }

  async getWinnerCarInfo(id: number): Promise<IWinnerCarInfo> {
    const res = await fetch(`${this.garage}/${id}`);
    const carInfo = await res.json();
    return carInfo;
  }
}
