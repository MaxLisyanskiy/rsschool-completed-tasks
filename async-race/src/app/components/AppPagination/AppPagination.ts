import "./AppPagination.scss";
import { createBtnElement, createElement } from "../../utils/createFunctions";
import { ITEMS_LIMIT } from "../../utils/constants";

export default class AppPagination {
  public paginations: HTMLElement;
  private prevBtn: HTMLButtonElement;
  private nextBtn: HTMLButtonElement;
  private currentPage: number = 1;
  private totalPages: number = 1;

  onChangePage!: (page: number) => void;

  constructor() {
    this.paginations = createElement("div", ["paginations"]);

    this.prevBtn = createBtnElement(["paginations__btn"], "button", "<span>❮</span> Prev Page", false);
    this.nextBtn = createBtnElement(["paginations__btn"], "button", "Next Page <span>❯</span>", false);

    this.prevBtn.onclick = () => this.onChangePage(this.currentPage - 1);
    this.nextBtn.onclick = () => this.onChangePage(this.currentPage + 1);

    this.paginations.append(this.prevBtn, this.nextBtn);
  }

  public updatePaginations = (pageNum: number, count: string) => {
    this.currentPage = pageNum;
    this.totalPages = Math.ceil(Number(count) / ITEMS_LIMIT);

    this.prevBtn.disabled = this.currentPage === 1 ? true : false;
    this.nextBtn.disabled = this.totalPages === this.currentPage ? true : false;
  };
}
