export interface CarInfo {
  name: string;
  color: string;
  id: number;
}

export interface CarsData {
  items: CarInfo[];
  count: string;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnersData {
  items: IWinner[] | [];
  count: string | null;
}

export enum WinnersSort {
  ID = "id",
  WINS = "wins",
  TIME = "time",
}

export enum WinnersOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface IWinnersTableData {
  winnerData: IWinner;
  carData: CarInfo;
}

/****** Engine ******/
export interface EngineMeasure {
  velocity: number;
  distance: number;
}

export interface EngineSuccess {
  success: boolean;
}
