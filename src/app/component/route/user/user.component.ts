import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../model/user/user.model';
import { Ship } from '../../../model/ship/ship.model';

import { TokenByLamService } from '../../../service/token/by-lam/token-by-lam.service';
import { UserByIdentifierService } from '../../../service/user/by-identifier/user-by-identifier.service';
import { ShipByUserService } from '../../../service/ship/ship/by-user/ship-by-user.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User;
  public ship: Ship;

  constructor(
    private route: ActivatedRoute,
    private tokenByLamService: TokenByLamService,
    private userByIdentifierService: UserByIdentifierService,
    private shipByUserService: ShipByUserService
  ) { }

  ngOnInit() {
    let tokenObs: Observable<string> = this.tokenByLamService.getTokenByLam();

    this.route.params
      .map(params => parseInt(params['id']))
      .combineLatest(tokenObs, (userId, token) => { return { userId, token } })
      .flatMap(res => this.userByIdentifierService.getUserByIdentifier(res.token, res.userId))
      .map(user => this.user = user.user)
      .flatMap(maybeUser => this.shipByUserService.getShipByUser(maybeUser))
      .do(ship => this.ship = ship)
      .subscribe();
  }

}
