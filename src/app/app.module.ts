import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSpinKitModule } from 'ng-spin-kit'
import { PersistenceModule, PersistenceService } from 'angular-persistence';

import { LayoutTemplateModule } from './component/layout-template/layout-template.module';

import { AppComponent } from './app.component';

import { PixelStarshipsAPIInterceptorBackend } from './interceptor/api/pss-api.interceptor';
import { ShipPreviewComponent } from './component/preview/ship-preview/ship-preview.component';
import { RoomPreviewComponent } from './component/preview/room-preview/room-preview.component';

import { FilterAllRouteComponent } from './component/route/filter-all-route/filter-all-route.component';
import { FilterTop100RouteComponent } from './component/route/filter-top100-route/filter-top100-route.component';
import { UserRouteComponent } from './component/route/user-route/user-route.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipPreviewComponent,
    RoomPreviewComponent,
    FilterAllRouteComponent,
    FilterTop100RouteComponent,
    UserRouteComponent
  ],
  imports: [
    // Packages
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgSpinKitModule,
    PersistenceModule,
    // Local
    LayoutTemplateModule
  ],
  providers: [
    { provide: XHRBackend, useClass: PixelStarshipsAPIInterceptorBackend },
    PersistenceService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
