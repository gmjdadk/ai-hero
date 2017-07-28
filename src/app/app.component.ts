import { Component } from '@angular/core';

import { CharacterDesignService } from './service/data/character-design.service';
import { RoomDesignService } from './service/data/room-design.service';
import { ShipDesignService } from './service/data/ship-design.service';
import { SpriteService } from './service/data/sprite.service';
import { FileService } from './service/data/file.service';
import { CrewService } from './service/ship/crew.service';
import { Room, RoomService } from './service/ship/room.service';

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
    CrewService,
    RoomService
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
    private crewService: CrewService,
    private roomService: RoomService
  ) {
    let token: string = '';
    shipDesignService.getShipDesigns().subscribe(c => console.log('ships', c));
    roomService.getRoomsByToken(token).subscribe(c => this.rooms = c);
  }
}
