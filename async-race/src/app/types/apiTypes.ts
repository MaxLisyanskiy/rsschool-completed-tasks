/****** Car ******/
export interface CarInfo {
  name: string;
  color: string;
  id: number;
}

export interface CarsData {
  items: CarInfo[];
  count: string;
}

/****** Winner ******/
export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnersData {
  items: IWinner[] | [];
  count: string;
}

export enum WinnersSort {
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
