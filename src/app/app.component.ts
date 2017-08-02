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

import { LocalAdministeredMacService } from './service/device/mac/lam.service';
import { TokenByLamService } from './service/token/by-lam/token-by-lam.service';

import { Ship } from './model/ship/ship.model';

import { Subject, Observable } from 'rxjs';

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
    UserByNameService,
    // Device
    LocalAdministeredMacService,
    // Token
    TokenByLamService
  ]
})
export class AppComponent {
  title = 'app';
  private ship: Ship;
  
  private userSearch: string;
  private userSearchSubject: Subject<string> = new Subject<string>();

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
    private userByNameService: UserByNameService,
    private tokenByLamService: TokenByLamService
  ) {
    let tokenObs: Observable<string> = tokenByLamService.getTokenByLam();

    this.userSearchSubject
      .debounceTime(250)
      .distinctUntilChanged()
      .combineLatest(tokenObs, (uname, token) => { return { uname: uname, token: token } })
      .flatMap(res => this.userByNameService.getUserByName(res.token, res.uname))
      .flatMap(res => this.shipByUserService.getShipByUser(res))
      .subscribe(ship => this.ship = ship);
    
    this.userSearchChanged('White Worf');
  }

  userSearchChanged(value: string) {
    this.userSearch = value;
    this.userSearchSubject.next(this.userSearch);
  }
}
