import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

// Components
import {AppDataTableComponent} from './components/data-table/app-data-table.component';
import {AppModalWrapperComponent} from "./components/modal-wrapper/app-modal-wrapper.component";
import {DropdownMenuComponent} from "./components/dropdown-menu/dropdown-menu.component";

const COMPONENTS = [
  AppDataTableComponent,
  AppModalWrapperComponent,
  DropdownMenuComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ...COMPONENTS,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule {
}
