import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SoftwareBaseService} from "../generic/software-base.service";
import {BaseSearchModel} from "../../../data/schema/search/base-search.model";
import {CategoryModel} from "../../../data/schema/category.model";
import {ProductGroupModule} from "../../../modules/software-module/product-group/product-group.module";

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService extends SoftwareBaseService {
  public getById(id: string): Observable<any> {
    return this.get(`/category/${id}`);
  }

  public findAll(search: BaseSearchModel<ProductGroupModule[]>): Observable<any> {
    return this.post('/product-group', search);
  }

  public save(categoryModel: CategoryModel) {
    return this.post('/category/insert', categoryModel);
  }

  public update(categoryModel: CategoryModel) {
    return this.put('/category/update', categoryModel);
  }

  public deleteCategory(id: string) {
    return this.delete('/category/delete', id);
  }
}
