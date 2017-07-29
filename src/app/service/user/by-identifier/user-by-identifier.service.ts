import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';

import { User } from '../../../model/user/user.model';
import { Ship } from '../../../model/ship/ship.model';
import { UserServiceBase } from '../base/user.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class UserByIdentifierService extends UserServiceBase {

  constructor(
    protected http: Http
  ) {
    super(http);
  }

  // Lifting the subcomponents out as meta-inf means we can toss the rest of the raw API call away
  private liftRawSubcomponents(ship: Ship, rawShip: Object): Ship {
    ship.MetaRawCharacters = rawShip['Characters']['Character'];
    ship.MetaRawRooms = rawShip['Rooms']['Room'];
    return ship;
  }

  getUserByIdentifier(token: string, uid: number): Observable<User> {
    return this.http
      .get('pss:/ShipService/InspectShip?userId=' + encodeURIComponent(uid.toString()) + '&accessToken=' + encodeURIComponent(token))
      .map(res => xml.parse(res.text()))
      .map(res => { console.log(res); return res; })
      .map(res => res['InspectShip'])
      .map(res => [ res['User'], res['Ship'] ])
      .map(res => {
        let [rawUser, rawShip] = res;
        let user = plainToClass(User, rawUser as Object);
        let ship = plainToClass(Ship, rawShip as Object);
        user.Ship = this.liftRawSubcomponents(ship, rawShip);
        return user;
      });
  }
}
