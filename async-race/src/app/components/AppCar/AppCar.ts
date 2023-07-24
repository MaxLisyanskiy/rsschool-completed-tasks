import "./AppCar.scss";
import ApiController from "../../services/api";
import { createBtnElement, createElement, createCarSvg } from "../../../utils/createFunctions";
import { AppState } from "../AppState";

export default class AppCar extends ApiController {
  public car: HTMLElement;
  private title: HTMLElement;
  private selectBtn: HTMLButtonElement;
  private removeBtn: HTMLButtonElement;
  private engineStartBtn: HTMLButtonElement;
  private engineStopBtn: HTMLButtonElement;
  private id: number;
  private name: string;
  private image: HTMLElement;
  private flag: HTMLElement;

  public onDeleteCar!: (id: number) => void;
  public onSelectCar!: (id: number, name: string, color: string) => void;

  constructor(name: string, color: string, id: number) {
    super();
    this.id = id;
    this.name = name;

    this.car = createElement("li", ["car"]);
    this.title = createElement("h4", ["car__title"], `${name} (${id})`);

    const actionBtns = createElement("div", ["car-btns"]);
    this.selectBtn = createBtnElement(["car-btns__item"], "button", "Select", false);
    this.selectBtn.onclick = () => this.onSelectCar(id, name, color);

    this.removeBtn = createBtnElement(["car-btns__item"], "button", "Remove", false);
    this.removeBtn.onclick = () => this.onDeleteCar(id);
    actionBtns.append(this.selectBtn, this.removeBtn);

    const road = createElement("div", ["car-road"]);
    const engineBtns = createElement("div", ["car-engine"]);
    this.engineStartBtn = createBtnElement(["car-engine__start"], "button", "A", false);
    this.engineStartBtn.onclick = () => this.handleStartDrive();

    this.engineStopBtn = createBtnElement(["car-engine__stop"], "button", "B", true);
    this.engineStopBtn.onclick = () => this.handleStopDrive();

    engineBtns.append(this.engineStartBtn, this.engineStopBtn);
    this.image = createCarSvg(color, "car__image");
    this.image.setAttribute("id", `car-${id}`);

    this.flag = createElement("div", ["car-finish"]);
    this.flag.innerHTML = `<img src="finish-flag.png">`;
    this.flag.setAttribute("id", `finishFlag-${id}`);

    road.append(engineBtns, this.image, this.flag);

    this.car.append(this.title, actionBtns, road);
  }

  private handleToggleShowingEngineBtns = (type: string): void => {
    if (type === "start") {
      this.engineStartBtn.disabled = true;
      this.engineStopBtn.disabled = false;
    } else {
      this.engineStartBtn.disabled = false;
      this.engineStopBtn.disabled = true;
    }
  };

  private handleAnimatedDriving = (id: number, roadDistance: number, duration: number): void => {
    let currentDistance = this.image.offsetLeft - 80;
    const framesCount = (duration / 1000) * 60;
    const transfer = (roadDistance - this.image.offsetLeft - 80) / framesCount;

    const animationMoving = async (): Promise<void> => {
      currentDistance += transfer;
      this.image.style.transform = `translateX(${currentDistance}px)`;

      if (currentDistance < roadDistance) {
        AppState.stateAnimations[id] = requestAnimationFrame(animationMoving);
      } else {
        if (AppState.isRacing) {
          if (AppState.winnerId === 0) {
            AppState.winnerId = id;
            AppState.winnerTime = Number((duration / 1000).toFixed(2));
            await this.saveWinner(AppState.winnerId, AppState.winnerTime).then(() => {
              const wonRacing = new CustomEvent("wonRacing", {
                bubbles: true,
                detail: { id: this.id, name: this.name, time: AppState.winnerTime },
              });
              this.car.dispatchEvent(wonRacing);
            });
          }
        }
      }
    };

    AppState.stateAnimations[id] = requestAnimationFrame(animationMoving);
  };

  public handleStartDrive = async (): Promise<void> => {
    this.handleToggleShowingEngineBtns("start");
    const { velocity, distance } = await this.startEngine(this.id);
    const time = Math.round(distance / velocity);

    const roadDistance =
      this.flag.getBoundingClientRect().left -
      this.image.getBoundingClientRect().left +
      this.flag.getBoundingClientRect().width;

    this.handleAnimatedDriving(this.id, roadDistance, time);

    const { success } = await this.switchCarToDrive(this.id);

    if (!success) {
      cancelAnimationFrame(AppState.stateAnimations[this.id]);
      await this.stopEngine(this.id);
    }
  };

  public handleStopDrive = async (): Promise<void> => {
    this.handleToggleShowingEngineBtns("stop");

    this.image.style.transform = `translateX(0)`;

    if (AppState.stateAnimations[this.id]) {
      cancelAnimationFrame(AppState.stateAnimations[this.id]);
    }
  };
}
