import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: 'category',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
    ],
  },
  {
    path: 'product-group',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./product-group/product-group.module').then((m) => m.ProductGroupModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesRoutingModule {
}
