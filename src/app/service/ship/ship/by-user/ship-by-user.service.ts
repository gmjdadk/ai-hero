import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';

import { User } from '../../../../model/user/user.model';
import { Ship } from '../../../../model/ship/ship.model';

import { ShipServiceBase } from '../base/ship.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class ShipByUserService extends ShipServiceBase {

  constructor(
    protected http: Http
  ) {
    super(http);
  }

  getShipByUser(user: User): Observable<Ship> {
    return Observable.of(user)
      .map(res => [ res.MetaRawShip, plainToClass(Ship, res.MetaRawShip as Object) ] as [Object, Ship])
      .map(res => {
        let [raw, ship] = res;
        ship.MetaRawCharacters = raw['Characters']['Character'];
        ship.MetaRawRooms = raw['Rooms']['Room'];
        return ship;
      });
  }
}
