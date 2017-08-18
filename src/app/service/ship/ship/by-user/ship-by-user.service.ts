import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { User, Ship } from '../../../../model/model.module';
import { ShipServiceBase } from '../base/ship.service';
import { ShipDesignService } from '../../../data/ship-design/ship-design.service';

@Injectable()
export class ShipByUserService extends ShipServiceBase {

  constructor(
    http: Http,
    shipDesignService: ShipDesignService
  ) {
    super(http, shipDesignService);
  }

  getShipByUser(user: User): Observable<Ship> {
    return Observable.of(user)
      .map(res => [ res.MetaRawShip, plainToClass(Ship, res.MetaRawShip as Object) ] as [Object, Ship])
      .map(res => {
        const [raw, ship] = res;
        ship.MetaRawCharacters = raw['Characters']['Character'];
        ship.MetaRawRooms = raw['Rooms']['Room'];
        return ship;
      })
      .flatMap(res => this.provideShip(res));
  }
}
