import {AppModalWrapperComponent} from '../../../../../shared/components/modal-wrapper/app-modal-wrapper.component';
import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppAlert, AppLoading, AppModals} from '../../../../../shared/utils';
import {CategoryModel} from "../../../../../data/schema/category.model";
import {ResponseModel} from "../../../../../data/response.model";
import {CategoryService} from "../../../../../core/service/software/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './app-add-category.component.html'
})
export class AppAddCategoryComponent implements AfterViewInit {
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

  public show() {
    this.resetData();
    this.addCategoryModal.show();
  }

  public hide() {
    this.addCategoryModal.hide();
  }

  public saveCategory() {
    if (this.isValidCategory()) {
      this.loading.show();
      this.categoryService.save(this.categoryModel).subscribe(res => this.saveCategoryCompleted(res));
    }
  }
}
