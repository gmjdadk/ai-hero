import { Component } from '@angular/core';

import { PersistentHttpService } from './service/http/persistent/persistent-http.service';

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
import { UserByRankingService } from './service/user/by-ranking/user-by-ranking.service';

import { Ship } from './model/ship/ship.model';

import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'pssr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
}
