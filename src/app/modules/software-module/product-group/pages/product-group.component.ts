import {AfterViewInit, Component} from '@angular/core';
import {BaseSearchModel} from "../../../../data/schema/search/base-search.model";
import {CategoryModel} from "../../../../data/schema/category.model";
import {AppAlert, AppLoading, AppModals} from "../../../../shared/utils";
import {CategoryService} from "../../../../core/service/software/category.service";
import {ResponseModel} from "../../../../data/response.model";
import {HTTP_CODE_CONSTANT} from "../../../../core/constant/http-code.constant";
import {ProductGroupService} from "../../../../core/service/software/product-group.service";
import {ProductGroupModel} from "../../../../data/schema/product-group.model";

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html'
})
export class ProductGroupComponent implements AfterViewInit {
  public search: BaseSearchModel<CategoryModel[]> = new BaseSearchModel();
  constructor(
    private modal: AppModals,
    private loading: AppLoading,
    private alert: AppAlert,
    private productGroupService: ProductGroupService
  ) {
  }
  ngAfterViewInit() {
    this.getProductGroups();
  }

  private getProductGroups() {
    this.loading.show();
    this.productGroupService.findAll(this.search).subscribe(res => this.getProductGroupsCompleted(res));
  }

  private getProductGroupsCompleted(res: ResponseModel<BaseSearchModel<ProductGroupModel[]>>) {
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
    this.getProductGroups();
  }

  public saveCategoryCompleteEvent() {
    this.search.currentPage = 0;
    this.getProductGroups();
  }

  public deleteCategory(id: string) {
    this.modal.confirm('Bạn có chắc chắn muốn xóa?').subscribe(res => this.confirmDeleteCategory(res, id));
  }


  private confirmDeleteCategory(state: boolean, id: string) {
    if (state) {
      this.loading.show();
      this.productGroupService.deleteCategory(id).subscribe(res => this.deleteCompleted(res));
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
    this.getProductGroups();
  }
}
