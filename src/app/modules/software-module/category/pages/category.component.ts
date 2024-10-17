import {AfterViewInit, Component} from '@angular/core';
import {BaseSearchModel} from "../../../../data/schema/search/base-search.model";
import {CategoryModel} from "../../../../data/schema/category.model";
import {AppAlert, AppLoading, AppModals} from "../../../../shared/utils";
import {CategoryService} from "../../../../core/service/software/category.service";
import {ResponseModel} from "../../../../data/response.model";
import {HTTP_CODE_CONSTANT} from "../../../../core/constant/http-code.constant";

@Component({
  selector: 'app-dashboard',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements AfterViewInit {
  public search: BaseSearchModel<CategoryModel[]> = new BaseSearchModel();
  constructor(
    private modal: AppModals,
    private loading: AppLoading,
    private alert: AppAlert,
    private categoryService: CategoryService
  ) {
  }
  ngAfterViewInit() {
    this.getCategories();
  }

  private getCategories() {
    this.loading.show();
    this.categoryService.findAll(this.search).subscribe(res => this.getCategoriesCompleted(res));
  }

  private getCategoriesCompleted(res: ResponseModel<BaseSearchModel<CategoryModel[]>>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.search = res.result;
  }

  public dataTableChange(searchChange: BaseSearchModel<CategoryModel[]>) {
    this.search = searchChange;
    this.getCategories();
  }

  public saveCategoryCompleteEvent() {
    this.search.currentPage = 0;
    this.getCategories();
  }

  public deleteCategory(id: string) {
    this.modal.confirm('Bạn có chắc chắn muốn xóa?').subscribe(res => this.confirmDeleteCategory(res, id));
  }


  private confirmDeleteCategory(state: boolean, id: string) {
    if (state) {
      this.loading.show();
      this.categoryService.deleteCategory(id).subscribe(res => this.deleteCompleted(res));
    }
  }

  private deleteCompleted(res: ResponseModel<any>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.alert.success(res.message[0]);
    this.getCategories();
  }
}
