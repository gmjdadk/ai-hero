import { NgModule } from '@angular/core';

import { PSSRHttpServiceModule } from '../http/http-service.module';

import { CrewServiceBase } from './crew/base/crew.service';
import { CrewByShipService } from './crew/by-ship/crew-by-ship.service';
import { CrewByTokenService } from './crew/by-token/crew-by-token.service';

import { RoomServiceBase } from './room/base/room.service';
import { RoomByShipService } from './room/by-ship/room-by-ship.service';
import { RoomByTokenService } from './room/by-token/room-by-token.service';

import { ShipServiceBase } from './ship/base/ship.service';
import { ShipByUserService } from './ship/by-user/ship-by-user.service';

export { CrewServiceBase, CrewByShipService, CrewByTokenService };
export { RoomServiceBase, RoomByShipService, RoomByTokenService };
export { ShipServiceBase, ShipByUserService };

@NgModule({
  imports: [
    PSSRHttpServiceModule
  ],
  declarations: [
    // Crew
    CrewByShipService,
    CrewByTokenService,
    // Room
    RoomByShipService,
    RoomByTokenService,
    // Ship
    ShipByUserService
  ],
  providers: [
    // Crew
    CrewByShipService,
    CrewByTokenService,
    // Room
    RoomByShipService,
    RoomByTokenService,
    // Ship
    ShipByUserService
  ]
})
export class PSSRShipServiceModule { }
