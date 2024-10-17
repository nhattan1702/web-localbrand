import {NgModule} from '@angular/core';
import {CategoryComponent} from './pages/category.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from "../../../shared/shared.module";
import {AppAddCategoryComponent} from "./components/add-category/app-add-category.component";
import {AppUpdateCategoryComponent} from "./components/update-category/app-update-category.component";

const COMPONENTS = [
  AppAddCategoryComponent,
  AppUpdateCategoryComponent
];

export const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  },
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CategoryComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CategoryModule {
}
