import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PSSRRenderServiceModule } from '../../service/render/render-service.module';

import { RenderRoomComponent } from './room/render-room.component';
import { RenderShipComponent } from './ship/render-ship.component';
import { RenderSmallShipComponent } from './small-ship/render-small-ship.component';

export { RenderRoomComponent, RenderShipComponent, RenderSmallShipComponent };

@NgModule({
  imports: [
    CommonModule,
    PSSRRenderServiceModule
  ],
  declarations: [
    RenderRoomComponent,
    RenderShipComponent,
    RenderSmallShipComponent
  ],
  exports: [
    RenderRoomComponent,
    RenderShipComponent,
    RenderSmallShipComponent
  ]
})
export class PSSRRenderComponentModule { }
