import { Component } from '@angular/core';

import { CharacterDesignService } from './service/data/character-design.service';
import { RoomDesignService } from './service/data/room-design.service';
import { CrewService } from './service/ship/crew.service';
import { RoomService } from './service/ship/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    // Data
    CharacterDesignService,
    RoomDesignService,
    // Ship
    CrewService,
    RoomService
  ]
})
export class AppComponent {
  title = 'app';

  constructor(
    private characterDesignService: CharacterDesignService,
    private roomDesignService: RoomDesignService,
    private crewService: CrewService,
    private roomService: RoomService
  ) {
    let token: string = '466c13ee-b166-43f1-84ea-80245e927b6c';
    characterDesignService.getCharacterDesigns().subscribe(c => console.debug(c));
    roomDesignService.getRoomDesignsMap().subscribe(c => console.debug('rd', c));
    crewService.getCrewByTokenMap(token).subscribe(c => console.debug('crew', c));
    roomService.getRoomsByToken(token).subscribe(c => console.debug('rooms', c));
  }
}
