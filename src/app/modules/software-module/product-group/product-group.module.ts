import {NgModule} from '@angular/core';
import {ProductGroupComponent} from './pages/product-group.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from "../../../shared/shared.module";

const COMPONENTS = [
];

export const routes: Routes = [
  {
    path: '',
    component: ProductGroupComponent
  },
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ProductGroupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductGroupModule {
}
