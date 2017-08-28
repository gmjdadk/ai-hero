import { Input, HostBinding, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User, UserBrief, Ship } from '../../model/model.module';
import { TokenByLamService } from '../../service/token/token-service.module';
import { UserByRankingService, UserByIdentifierService } from '../../service/user/user-service.module';
import { ShipByUserService } from '../../service/ship/ship-service.module';

@Component({
  selector: 'pssr-route-top100',
  templateUrl: './top100.component.html',
  styleUrls: ['./top100.component.scss']
})
export class Top100RouteComponent implements OnInit {
  @Input() @HostBinding('class.expanded') expanded = false;

  public users: {user: User, ship: Ship}[];

  constructor(
    private tokenByLamService: TokenByLamService,
    private usersByRankingService: UserByRankingService,
    private userByIdentifierService: UserByIdentifierService,
    private shipByUserService: ShipByUserService
  ) { }

  ngOnInit() {
    const tokenObs: Observable<string> = this.tokenByLamService.getTokenByLam();

    tokenObs
      .flatMap(token => this.usersByRankingService.getUsersByRanking(token, 1, 100))
      .map(users => this.users = users.map(x => ({user: x, ship: null}) ))
      .do(users => {
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

}
