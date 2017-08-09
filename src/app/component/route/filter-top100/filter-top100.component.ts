import { Component, OnInit } from '@angular/core';

import { User } from '../../../model/user/user.model';
import { Ship } from '../../../model/ship/ship.model';

import { TokenByLamService } from '../../../service/token/by-lam/token-by-lam.service';
import { UserByRankingService } from '../../../service/user/by-ranking/user-by-ranking.service';
import { UserByIdentifierService } from '../../../service/user/by-identifier/user-by-identifier.service';
import { ShipByUserService } from '../../../service/ship/ship/by-user/ship-by-user.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-top100',
  templateUrl: './filter-top100.component.html',
  styleUrls: ['./filter-top100.component.css']
})
export class FilterTop100Component implements OnInit {
  public users: {user: User, ship: Ship}[];

  constructor(
    private tokenByLamService: TokenByLamService,
    private usersByRankingService: UserByRankingService,
    private userByIdentifierService: UserByIdentifierService,
    private shipByUserService: ShipByUserService
  ) { }

  ngOnInit() {
    let tokenObs: Observable<string> = this.tokenByLamService.getTokenByLam();

    tokenObs
      .flatMap(token => this.usersByRankingService.getUsersByRanking(token, 1, 100))
      .map(users => this.users = users.map(x => ({user: x, ship: null}) ))
      .do(users => {
        Observable.from(users.map((x, i) => ({unwrap: x, index: i}) ))
          .concatMap(i => Observable.of(i).delay(Math.min(50 + i.index * 25, 1000)))
          .do(s => console.log('fetching', s.index))
          .combineLatest(tokenObs)
          .flatMap(res => {
            let [val, token] = res;
            return this.userByIdentifierService.getUserByIdentifier(token, val.unwrap.user.Id)
              .flatMap(user => this.shipByUserService.getShipByUser(user.user))
              .map(ship => ({index: val.index, ship: ship}));
          })
          .do(res => this.users[res.index].ship = res.ship)
          /*
          .flatMap(res => ({ res[0], ... { val: this.userByIdentifierService.getUserByIdentifier(res[1], res[0].val.user) }}))
          .switchMap(user => user.exists? this.shipByUserService.getShipByUser(user.user) : null)
          .reduce((_, u, i) => users[i].ship = u)
          */
          .subscribe();
      })
      .subscribe();
  }

}
