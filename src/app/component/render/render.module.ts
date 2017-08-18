import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenderRoomComponent } from './room/render-room.component';
import { RenderShipComponent } from './ship/render-ship.component';
import { RenderSmallShipComponent } from './small-ship/render-small-ship.component';

export { RenderRoomComponent, RenderShipComponent, RenderSmallShipComponent };

@NgModule({
  imports: [
    CommonModule
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
