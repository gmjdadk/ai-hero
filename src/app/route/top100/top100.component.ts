import { Input, HostBinding, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User, UserBrief, Ship } from '../../model/model.module';
import { TokenByLamService } from '../../service/token/token-service.module';
import { UserByRankingService, UserByNameService, UserByIdentifierService } from '../../service/user/user-service.module';
import { ShipByUserService } from '../../service/ship/ship-service.module';

@Component({
  selector: 'pssr-route-top100',
  templateUrl: './top100.component.html',
  styleUrls: ['./top100.component.scss']
})
export class Top100RouteComponent implements OnInit {
  @Input() expanded = false;

  public users: {user: User, ship: Ship}[];

  public userSearch: string;
  private userSearchSubject: Subject<string> = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private tokenByLamService: TokenByLamService,
    private usersByRankingService: UserByRankingService,
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
      .switchMap(res => res.uname === ''
        ? this.top100Rankings(res.token) : this.searchByNameRankings(res.token, res.uname))
      .subscribe();

    this.route.url.subscribe(res => {
      this.userSearchSubject.next('');
    });
  }

  searchByNameRankings(token: string, uname: string): Observable<{}> {
    return this.usersByNameService.getAllUsersMatching(token, uname)
      .map(users => this.users = users.map(x => ({user: x, ship: null}) ))
      .do(users => {
        // FIXME: need to unsubscribe from all of these when the search changes
        Observable.from(users.map((x, i) => ({unwrap: x, index: i}) ))
          .concatMap(i => Observable.of(i).delay(Math.min(50 + i.index * 25, 1000)))
          .flatMap(res => {
            return this.userByIdentifierService.getUserByIdentifier(token, res.unwrap.user.Id)
              .flatMap(user => this.shipByUserService.getShipByUser(user.user))
              .map(ship => ({index: res.index, ship: ship}));
          })
          .do(res => this.users[res.index].ship = res.ship)
          .subscribe();
      });
  }

  top100Rankings(token: string): Observable<{}> {
    return this.usersByRankingService.getUsersByRanking(token, 1, 100)
      .map(users => this.users = users.map(x => ({user: x, ship: null}) ))
      .do(users => {
        // FIXME: need to unsubscribe from all of these when the search changes
        Observable.from(users.map((x, i) => ({unwrap: x, index: i}) ))
          .concatMap(i => Observable.of(i).delay(Math.min(50 + i.index * 25, 1000)))
          .flatMap(res => {
            return this.userByIdentifierService.getUserByIdentifier(token, res.unwrap.user.Id)
              .flatMap(user => this.shipByUserService.getShipByUser(user.user))
              .map(ship => ({index: res.index, ship: ship}));
          })
          .do(res => this.users[res.index].ship = res.ship)
          .subscribe();
      });
  }

  get renderAsExpanded(): boolean {
    return !(this.users && this.users.length > 25 && !this.expanded);
  }

  get renderSizeOfResults(): string {
    if (!this.users) {
      return ' (fetching...)';
    }
    return this.users.length === 1
      ? ' (1 result)'
      : [' (', this.users.length, ' results)'].join('');
  }

  userSearchChanged(value: string) {
    this.userSearch = value;
    this.userSearchSubject.next(this.userSearch);
  }

}
