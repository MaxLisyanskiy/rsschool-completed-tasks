import "./winners.scss";

import ApiController from "../../services/api";
import AppTable from "../../components/AppTable/AppTable";
import AppPagination from "../../components/AppPagination/AppPagination";

import { createElement, createTextElement } from "../../utils/createFunctions";
import { IWinner, IWinnersTableData, WinnersOrder, WinnersSort } from "../../types/apiTypes";
import { WINNERS_LIMIT } from "../../utils/constants";

export default class WinnersPage extends ApiController {
  public page: HTMLElement;
  private title: HTMLElement;
  private subtitle: HTMLElement;
  private table: AppTable;
  private paginations: AppPagination;

  private pageNum: number = 1;
  private sort: WinnersSort;
  private order: WinnersOrder;

  constructor() {
    super();
    this.sort = WinnersSort.WINS;
    this.order = WinnersOrder.DESC;

    this.page = createElement("section", ["page", "winners"]);
    this.title = createTextElement("h2", "page__title", "Winners");
    this.subtitle = createTextElement("h3", "page__subtitle", "Page");
    this.table = new AppTable();
    this.table.onChangeSort = (nameSort: WinnersSort) => this.handleChangeSort(nameSort);
    this.paginations = new AppPagination();
    this.paginations.onChangePage = (pageNum: number) => this.handleChangePage(pageNum);

    this.page.append(this.title, this.subtitle, this.table.table, this.paginations.paginations);
  }

  private handleChangePage = async (pageNum: number): Promise<void> => {
    this.pageNum = pageNum;
    await this.updateWinnersPage();
  };

  private handleChangeSort = async (nameSort: WinnersSort): Promise<void> => {
    if (nameSort === this.sort) {
      this.order = this.order === WinnersOrder.ASC ? WinnersOrder.DESC : WinnersOrder.ASC;
    } else {
      this.sort = nameSort;
      this.order = WinnersOrder.DESC;
    }

    this.updateWinnersPage();
  };

  public async updateWinnersPage(): Promise<void> {
    const { items, count } = await this.getWinners(this.pageNum, this.sort, this.order);

    this.title.innerHTML = `Winners (${count})`;
    this.subtitle.innerHTML = `Page #${this.pageNum}`;

    const tableData: IWinnersTableData[] = [];

    items.forEach(async (winnerData: IWinner, index: number) => {
      const carData = await this.getWinnerCarInfo(winnerData.id);
      tableData.push({ winnerData, carData });

      if (index === items.length - 1) {
        this.table.updateTableBody(tableData);
      }
    });

    this.table.updateSortingBtns(this.sort, this.order);
    this.paginations.updatePaginations(this.pageNum, count, WINNERS_LIMIT);
  }
}
