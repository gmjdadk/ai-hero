import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule, XHRBackend } from '@angular/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { APIInterceptorBackend } from './interceptor/api.interceptor';
import { ShipPreviewComponent } from './component/preview/ship-preview/ship-preview.component';
import { RoomPreviewComponent } from './component/preview/room-preview/room-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipPreviewComponent,
    RoomPreviewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule
  ],
  providers: [
    { provide: XHRBackend, useClass: APIInterceptorBackend }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
