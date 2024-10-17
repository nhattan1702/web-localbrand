import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import * as Services from './core/service';
import * as Utils from './shared/utils';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {SidebarComponent} from './partials/sidebar/sidebar.component';
import {NavbarComponent} from './partials/navbar/navbar.component';
import {AppFooterComponent} from './partials/footer/app-footer.component';
import {LayoutComponent} from './partials/layout/layout.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

const PARTIALS = [
  LayoutComponent,
  SidebarComponent,
  NavbarComponent,
  AppFooterComponent
];

const UTILS_PROVIDERS = [
  Utils.AppModals,
  Utils.AppLoading,
  Utils.AppAlert
];

@NgModule({
  declarations: [
    AppComponent,
    PARTIALS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    SharedModule,
    CoreModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Services.CustomHandleInterceptor,
      multi: true
    },
    ...UTILS_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
