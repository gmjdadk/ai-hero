import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { PersistenceModule, PersistenceService } from 'angular-persistence';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PixelStarshipsAPIInterceptorBackend } from './interceptor/interceptor.module';
import { PSSRLayoutTemplateComponentModule } from './component/layout-template/layout-template.module';

import { PSSRDataServiceModule } from './service/data/data-service.module';
import { PSSRDeviceServiceModule } from './service/device/device-service.module';
import { PSSRHttpServiceModule } from './service/http/http-service.module';
import { PSSRRenderServiceModule } from './service/render/render-service.module';
import { PSSRShipServiceModule } from './service/ship/ship-service.module';
import { PSSRTokenServiceModule } from './service/token/token-service.module';
import { PSSRUserServiceModule } from './service/user/user-service.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Packages
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    PersistenceModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    // PSSR Modules
    AppRoutingModule,
    PSSRLayoutTemplateComponentModule,
    // Services
    PSSRDataServiceModule,
    PSSRDeviceServiceModule,
    PSSRHttpServiceModule,
    PSSRRenderServiceModule,
    PSSRShipServiceModule,
    PSSRTokenServiceModule,
    PSSRUserServiceModule
  ],
  providers: [
    { provide: XHRBackend, useClass: PixelStarshipsAPIInterceptorBackend },
    PersistenceService,
    Angulartics2GoogleAnalytics
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
