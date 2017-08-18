import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User, Ship } from '../../model/model.module';
import { TokenByLamService } from '../../service/token/token-service.module';
import { UserByIdentifierService } from '../../service/user/user-service.module';
import { ShipByUserService } from '../../service/ship/ship-service.module';

@Component({
  selector: 'pssr-route-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserRouteComponent implements OnInit {
  public user: User;
  public ship: Ship;

  constructor(
    private route: ActivatedRoute,
    private tokenByLamService: TokenByLamService,
    private userByIdentifierService: UserByIdentifierService,
    private shipByUserService: ShipByUserService
  ) { }

  ngOnInit() {
    const tokenObs: Observable<string> = this.tokenByLamService.getTokenByLam();

    this.route.params
      .map(params => parseInt(params['id'], 10))
      .combineLatest(tokenObs, (userId, token) => ({ userId, token }))
      .flatMap(res => this.userByIdentifierService.getUserByIdentifier(res.token, res.userId))
      .map(user => this.user = user.user)
      .flatMap(maybeUser => this.shipByUserService.getShipByUser(maybeUser))
      .do(ship => this.ship = ship)
      .subscribe();
  }

}
