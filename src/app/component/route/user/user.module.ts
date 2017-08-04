import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

import { ShipPreviewComponent } from './preview/ship-preview/ship-preview.component';
import { RoomPreviewComponent } from './preview/room-preview/room-preview.component';
// import { CrewPreviewComponent } from './preview/room-preview/room-preview.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    // Preview
    ShipPreviewComponent,
    RoomPreviewComponent
  ],
  exports: [
    UserComponent,
    // Preview
    ShipPreviewComponent,
    RoomPreviewComponent
  ]
})
export class SeerUserModule { }