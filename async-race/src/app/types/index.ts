export enum Pages {
  GARAGE = "garage",
  WINNERS = "winners",
}

export interface CreateRandomCar {
  newCarName: string;
  newCarColor: string;
}

export interface IAppState {
  isRacing: boolean;
  stateAnimations: Record<string, number>;
  winnerId: number;
  winnerTime: number;
}
