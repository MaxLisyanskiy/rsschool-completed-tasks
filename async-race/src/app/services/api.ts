import {
  CarInfo,
  CarsData,
  EngineMeasure,
  EngineSuccess,
  IWinner,
  IWinnersData,
  WinnersOrder,
  WinnersSort,
} from "../types/apiTypes";
import { ITEMS_LIMIT } from "../utils/constants";

export default class ApiController {
  baseApiUrl: string;
  winners: string;
  garage: string;
  engine: string;
  basePage: number = 1;

  constructor() {
    this.baseApiUrl = "http://localhost:3000";
    this.winners = `${this.baseApiUrl}/winners`;
    this.garage = `${this.baseApiUrl}/garage`;
    this.engine = `${this.baseApiUrl}/engine`;
  }

  /****** Winners ******/
  async getWinners(
    page: number = this.basePage,
    sort: WinnersSort = WinnersSort.WINS,
    order: WinnersOrder = WinnersOrder.DESC,
  ): Promise<IWinnersData> {
    const res = await fetch(`${this.winners}?_page=${page}&_limit=${ITEMS_LIMIT}&_sort=${sort}&_order=${order}`);
    const items = await res.json();
    const count = res.headers.get("X-Total-Count") || "1";
    return { items, count };
  }

  async getWinner(id: number): Promise<IWinner> {
    const res = await fetch(`${this.winners}/${id}`);
    return res.json();
  }

  async getWinnerCarInfo(id: number): Promise<CarInfo> {
    const res = await fetch(`${this.garage}/${id}`);
    const carInfo = await res.json();

    return carInfo;
  }

  async updateWinner(id: number, wins: number, time: number) {
    const res = await fetch(`${this.winners}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ wins, time }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  async createWinner(id: number | null, wins: number, time: number): Promise<IWinner> {
    const res = await fetch(`${this.winners}`, {
      method: "POST",
      body: JSON.stringify({ id, wins, time }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  async saveWinner(id: number, time: number): Promise<void> {
    const winner = await this.getWinner(id);

    if (Object.keys(winner).length !== 0) {
      const newTime = time < winner.time ? time : winner.time;
      await this.updateWinner(id, winner.wins + 1, newTime);
    } else {
      await this.createWinner(id, 1, time);
    }
  }

  /****** Garage ******/
  async getCars(page: number = this.basePage): Promise<CarsData> {
    const res = await fetch(`${this.garage}?_page=${page}&_limit=${ITEMS_LIMIT}`);
    const items = await res.json();
    const count = res.headers.get("X-Total-Count") || "1";

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

  async deleteCar(id: number): Promise<void> {
    const res = await fetch(`${this.garage}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  async updateCar(id: number, name: string, color: string): Promise<CarInfo> {
    const res = await fetch(`${this.garage}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, color }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  /****** Engine ******/
  async startEngine(id: number): Promise<EngineMeasure> {
    const res = await fetch(`${this.engine}?id=${id}&status=started`, { method: "PATCH" });
    return res.json();
  }

  async stopEngine(id: number): Promise<EngineMeasure> {
    const res = await fetch(`${this.engine}?id=${id}&status=stopped`, { method: "PATCH" });
    return res.json();
  }

  async switchCarToDrive(id: number): Promise<EngineSuccess> {
    try {
      const res = await fetch(`${this.engine}?id=${id}&status=drive`, { method: "PATCH" });
      const resSuccess = await res.json();
      return resSuccess;
    } catch (error) {
      return { success: false };
    }
  }
}
