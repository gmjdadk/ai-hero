import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, XHRBackend } from '@angular/http';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { APIInterceptorBackend } from './interceptor/api.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    { provide: XHRBackend, useClass: APIInterceptorBackend }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
