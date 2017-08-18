import { NgModule } from '@angular/core';

import { LocalAdministeredMacService } from './mac/lam.service';

export { LocalAdministeredMacService };

@NgModule({
  providers: [
    LocalAdministeredMacService
  ],
})
export class PSSRDeviceServiceModule { }
