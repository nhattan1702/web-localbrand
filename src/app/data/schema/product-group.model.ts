import {CategoryModel} from "./category.model";

export class ProductGroupModel {
  public id: string;
  public name: string;
  public category: CategoryModel;

  public constructor(
    data?: ProductGroupModel
  ) {
    const productGroup = data == null ? this : data;

    this.id = productGroup.id;
    this.name = productGroup.name;
    this.category = new CategoryModel(productGroup.category);
  }
}
