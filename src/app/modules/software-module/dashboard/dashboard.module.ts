import {NgModule} from '@angular/core';
import {DashboardComponent} from './pages/dashboard.component';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule {
}
