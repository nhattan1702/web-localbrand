import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../../shared/utils';
import {CategoryModel} from "../../../../../data/schema/category.model";
import {ResponseModel} from "../../../../../data/response.model";
import {CategoryService} from "../../../../../core/service/software/category.service";

@Component({
  selector: 'app-update-category',
  templateUrl: './app-update-category.component.html'
})
export class AppUpdateCategoryComponent implements AfterViewInit {
  @Output() saveCompleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('addCategoryModalWrapper', {static: true}) addCategoryModal: AppModalWrapperComponent;
  public categoryModel: CategoryModel = new CategoryModel();
  public isUpdate = false;

  constructor(
    private modal: AppModals,
    private alert: AppAlert,
    private loading: AppLoading,
    private categoryService: CategoryService
  ) {
  }

  ngAfterViewInit() {
  }

  private resetData() {
    this.categoryModel = new CategoryModel();
  }

  private getData(id: string) {
    this.getCategory(id);
  }

  private getCategory(id: string) {
    this.loading.show();
    this.categoryService.getById(id).subscribe(res => this.getDataCompleted(res));
  }

  private getDataCompleted(res: ResponseModel<CategoryModel>) {
    this.loading.hide();
    this.categoryModel = res.result;
  }

  private saveCategoryCompleted(res: ResponseModel<CategoryModel>) {
    this.loading.hide();
    this.saveCompleteEvent.emit(res.result);
    this.hide();
  }

  private isValidCategory() {
    const msg: string[] = [];
    if (!this.categoryModel.name) {
      msg.push('Vui lòng nhập tên danh mục.');
    }

    msg.forEach(m => this.alert.error(m));
    return msg.length === 0;
  }

  public show(id: string) {
    this.resetData();
    this.getData(id);
    this.addCategoryModal.show();
  }

  public hide() {
    this.addCategoryModal.hide();
  }

  public saveCategory() {
    if (this.isValidCategory()) {
      this.loading.show();
      this.categoryService.update(this.categoryModel).subscribe(res => this.saveCategoryCompleted(res));
    }
  }
}
