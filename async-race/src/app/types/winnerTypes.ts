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

export interface IWinnerCarInfo {
  name: string;
  color: string;
  id: number;
}

export interface IWinnersTableData {
  winnerData: IWinner;
  carData: IWinnerCarInfo;
}
