import { NgModule } from '@angular/core';

import { PSSRHttpServiceModule } from '../http/http-service.module';
import { PSSRDeviceServiceModule } from '../device/device-service.module';

import { TokenServiceBase } from './base/token.service';
import { TokenByLamService } from './by-lam/token-by-lam.service';

export { TokenServiceBase, TokenByLamService };

@NgModule({
  imports: [
    PSSRHttpServiceModule,
    PSSRDeviceServiceModule
  ],
  declarations: [
    TokenByLamService
  ],
  providers: [
    TokenByLamService
  ]
})
export class PSSRTokenServiceModule { }
