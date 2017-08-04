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

import { Ship } from './model/ship/ship.model';

import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    PersistentHttpService,
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
    //LocalAdministeredMacService,
    // Token
    //TokenByLamService
  ]
})
export class AppComponent {
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
    private userByNameService: UserByNameService
  ) {
    //let tokenObs: Observable<string> = tokenByLamService.getTokenByLam();

    // preload
    Observable.forkJoin([
      characterDesignService.preloadCommons(),
      fileService.preloadCommons(),
      roomDesignService.preloadCommons(),
      shipDesignService.preloadCommons(),
      spriteService.preloadCommons()
    ])
    .subscribe();
    /*
    this.userSearchSubject
      .debounceTime(250)
      .map(res => res.trim())
      .distinctUntilChanged()
      .do(() => this.ship = null)
      .combineLatest(tokenObs, (uname, token) => { return { uname: uname, token: token } })
      .flatMap(res => this.userByNameService.getUserByName(res.token, res.uname))
      .switchMap(res => res.exists? this.shipByUserService.getShipByUser(res.user) : Observable.of(null))
      .subscribe(ship => this.ship = ship);
      */
    // TODO
    // Header, Content, Footer, Layout components
    // Top 100 data service


    // <User name>                       ALL     TOP 100

    // Routes
    // All:     /?q
    // Top100:  /top100?q=
    // View:    /user/:id

    // After a small period of time, if no search is made, White Worf is typed into the search bar
    
    this.userSearchChanged('White Worf');
  }

  userSearchChanged(value: string) {
    this.userSearch = value;
    this.userSearchSubject.next(this.userSearch);
  }
}
