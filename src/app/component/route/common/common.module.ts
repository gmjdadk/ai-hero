import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipPreviewComponent } from './preview/ship-preview/ship-preview.component';
import { RoomPreviewComponent } from './preview/room-preview/room-preview.component';
import { SmallShipPreviewComponent } from './preview/small-ship-preview/small-ship-preview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    // Preview
    ShipPreviewComponent,
    RoomPreviewComponent,
    SmallShipPreviewComponent
  ],
  exports: [
    // Preview
    ShipPreviewComponent,
    RoomPreviewComponent,
    SmallShipPreviewComponent
  ]
})
export class SeerCommonComponentsModule { }