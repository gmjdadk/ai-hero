import { Component, OnInit } from '@angular/core';

import { User } from '../../../model/user/user.model';
import { Ship } from '../../../model/ship/ship.model';

import { TokenByLamService } from '../../../service/token/by-lam/token-by-lam.service';
import { UserByNameService } from '../../../service/user/by-name/user-by-name.service';
import { UserByIdentifierService } from '../../../service/user/by-identifier/user-by-identifier.service';
import { ShipByUserService } from '../../../service/ship/ship/by-user/ship-by-user.service';

import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-filter-all',
  templateUrl: './filter-all.component.html',
  styleUrls: ['./filter-all.component.css']
})
export class FilterAllComponent implements OnInit {
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
    let tokenObs: Observable<string> = this.tokenByLamService.getTokenByLam();

    this.userSearchSubject
      .debounceTime(250)
      .map(res => res.trim())
      .distinctUntilChanged()
      .do(() => this.users = null)
      .combineLatest(tokenObs, (uname, token) => { return { uname: uname, token: token } })
      .flatMap(res => this.usersByNameService.getAllUsersMatching(res.token, res.uname))
      .map(users => this.users = users.map(x => ({user: x, ship: null}) ))
      .do(users => {
        // FIXME: need to unsubscribe from all of these when the search changes
        Observable.from(users.map((x, i) => ({unwrap: x, index: i}) ))
          .concatMap(i => Observable.of(i).delay(Math.min(50 + i.index * 25, 1000)))
          .combineLatest(tokenObs)
          .flatMap(res => {
            let [val, token] = res;
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
