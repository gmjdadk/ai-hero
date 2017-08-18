import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User, UserBrief, Ship } from '../../model/model.module';
import { TokenByLamService } from '../../service/token/token-service.module';
import { UserByNameService, UserByIdentifierService } from '../../service/user/user-service.module';
import { ShipByUserService } from '../../service/ship/ship-service.module';

@Component({
  selector: 'pssr-route-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.scss']
})
export class SearchAllRouteComponent implements OnInit {
  public users: {user: User, ship: Ship}[];

  public userSearch: string;
  private userSearchSubject: Subject<string> = new Subject<string>();

  constructor(
    private tokenByLamService: TokenByLamService,
    private usersByNameService: UserByNameService,
    private userByIdentifierService: UserByIdentifierService,
    private shipByUserService: ShipByUserService
  ) { }

  ngOnInit() {
    const tokenObs: Observable<string> = this.tokenByLamService.getTokenByLam();

    this.userSearchSubject
      .debounceTime(250)
      .map(res => res.trim())
      .distinctUntilChanged()
      .do(() => this.users = null)
      .combineLatest(tokenObs, (uname, token) => ({ uname: uname, token: token }))
      .flatMap(res => this.usersByNameService.getAllUsersMatching(res.token, res.uname))
      .map(users => this.users = users.map(x => ({user: x, ship: null}) ))
      .do(users => {
        // FIXME: need to unsubscribe from all of these when the search changes
        Observable.from(users.map((x, i) => ({unwrap: x, index: i}) ))
          .concatMap(i => Observable.of(i).delay(Math.min(50 + i.index * 25, 1000)))
          .combineLatest(tokenObs)
          .flatMap(res => {
            const [val, token] = res;
            return this.userByIdentifierService.getUserByIdentifier(token, val.unwrap.user.Id)
              .flatMap(user => this.shipByUserService.getShipByUser(user.user))
              .map(ship => ({index: val.index, ship: ship}));
          })
          .do(res => this.users[res.index].ship = res.ship)
          .subscribe();
      })
      .subscribe();
  }

  userSearchChanged(value: string) {
    this.userSearch = value;
    this.userSearchSubject.next(this.userSearch);
  }
}
