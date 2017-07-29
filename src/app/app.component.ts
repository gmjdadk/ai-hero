import { Component } from '@angular/core';

import { CharacterDesignService } from './service/data/character-design/character-design.service';
import { RoomDesignService } from './service/data/room-design/room-design.service';
import { ShipDesignService } from './service/data/ship-design/ship-design.service';
import { SpriteService } from './service/data/sprite/sprite.service';
import { FileService } from './service/data/file/file.service';

import { CrewByTokenService } from './service/ship/crew/by-token/crew-by-token.service';
import { RoomByTokenService } from './service/ship/room/by-token/room-by-token.service';

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
    RoomByTokenService
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
    private roomByTokenService: RoomByTokenService
  ) {
    let token: string = '';
    shipDesignService.getShipDesigns().subscribe(c => console.log('ships', c));
    roomByTokenService.getRoomsByToken(token).subscribe(c => this.rooms = c);

    // /UserService/GetCurrentUser?accessToken=...
    // gives UserId as property of GetCurrentUser tag

    // /ShipService/GetShipByUserId?userId=1911163&accessToken=...
    // gives ShipId
  }
}
