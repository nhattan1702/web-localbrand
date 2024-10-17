export class BaseSearchModel<T> {
  public currentPage = 0;
  public recordOfPage = 10;
  public totalRecords = 0;
  public sortAsc = false;
  public sortBy = '';
  public pagingRange = 5;
  public result: T;

  constructor(data?: BaseSearchModel<T>) {
    const baseSearch = data == null ? this : data;
    this.result = baseSearch.result;
  }
}
