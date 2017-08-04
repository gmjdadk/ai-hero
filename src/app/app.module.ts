import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersistenceModule, PersistenceService } from 'angular-persistence';

import { LayoutTemplateModule } from './component/layout-template/layout-template.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PixelStarshipsAPIInterceptorBackend } from './interceptor/api/pss-api.interceptor';

import { SeerUserModule } from './component/route/user/user.module';
import { SeerFilterAllModule } from './component/route/filter-all/filter-all.module';
import { SeerFilterTop100Module } from './component/route/filter-top100/filter-top100.module';

import { TokenByLamService } from './service/token/by-lam/token-by-lam.service';
import { LocalAdministeredMacService } from './service/device/mac/lam.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Packages
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    PersistenceModule,
    // Local
    AppRoutingModule,
    LayoutTemplateModule,
    SeerUserModule,
    SeerFilterAllModule,
    SeerFilterTop100Module
  ],
  providers: [
    { provide: XHRBackend, useClass: PixelStarshipsAPIInterceptorBackend },
    PersistenceService,
    TokenByLamService,
    LocalAdministeredMacService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
