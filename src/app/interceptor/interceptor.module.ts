import { NgModule } from '@angular/core';

import { PixelStarshipsAPIInterceptorBackend } from './pss-api/pss-api.interceptor';

export { PixelStarshipsAPIInterceptorBackend };

/* { provide: XHRBackend, useClass: PixelStarshipsAPIInterceptorBackend } */
@NgModule({})
export class PSSRInterceptorsModule { }
