import { Component } from '@angular/core';

import { CharacterDesignService } from './service/data/character-design/character-design.service';
import { RoomDesignService } from './service/data/room-design/room-design.service';
import { ShipDesignService } from './service/data/ship-design/ship-design.service';
import { SpriteService } from './service/data/sprite/sprite.service';
import { FileService } from './service/data/file/file.service';

import { CrewByTokenService } from './service/ship/crew/by-token/crew-by-token.service';
import { RoomByShipService } from './service/ship/room/by-ship/room-by-ship.service';
import { RoomByTokenService } from './service/ship/room/by-token/room-by-token.service';
import { ShipByUserService } from './service/ship/ship/by-user/ship-by-user.service';

import { UserByIdentifierService } from './service/user/by-identifier/user-by-identifier.service';
import { UserByNameService } from './service/user/by-name/user-by-name.service';

import { Room } from './model/ship/room.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    // Data
    CharacterDesignService,
    RoomDesignService,
    ShipDesignService,
    SpriteService,
    FileService,
    // Ship
    CrewByTokenService,
    RoomByTokenService,
    RoomByShipService,
    ShipByUserService,
    // User
    UserByIdentifierService,
    UserByNameService
  ]
})
export class AppComponent {
  title = 'app';
  private rooms: Room[];

  constructor(
    private characterDesignService: CharacterDesignService,
    private roomDesignService: RoomDesignService,
    private shipDesignService: ShipDesignService,
    private spriteService: SpriteService,
    private fileService: FileService,
    private crewByTokenService: CrewByTokenService,
    private roomByTokenService: RoomByTokenService,
    private roomByShipService: RoomByShipService,
    private shipByUserService: ShipByUserService,
    private userByIdService: UserByIdentifierService,
    private userByNameService: UserByNameService
  ) {
    let token: string = '';
    shipDesignService.getShipDesigns().subscribe(c => console.log('ships', c));
    //roomByTokenService.getRoomsByToken(token).subscribe(c => this.rooms = c);
    /*
    userByIdService.getUserByIdentifier(token, 1214765)
      .flatMap(res => { console.log('user', res); return shipByUserService.getShipByUser(res) })
      .subscribe(res => console.log('ship by user', res));
    */

    userByNameService.getUserByName(token, 'Zensi')
      .flatMap(res => this.shipByUserService.getShipByUser(res))
      .flatMap(res => this.roomByShipService.getRoomsByShip(res))
      .subscribe(c => this.rooms = c);
      //.subscribe(c => console.log('ship byname', c))

    // /UserService/GetCurrentUser?accessToken=...
    // gives UserId as property of GetCurrentUser tag

    // /ShipService/GetShipByUserId?userId=1911163&accessToken=...
    // gives ShipId
  }
}
