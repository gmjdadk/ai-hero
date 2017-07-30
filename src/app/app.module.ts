import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PixelStarshipsAPIInterceptorBackend } from './interceptor/api/pss-api.interceptor';
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
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: XHRBackend, useClass: PixelStarshipsAPIInterceptorBackend }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
