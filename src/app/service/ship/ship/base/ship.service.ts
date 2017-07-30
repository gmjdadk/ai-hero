import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ShipDesignService } from '../../../data/ship-design/ship-design.service';
import { Ship } from '../../../../model/ship/ship.model';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export abstract class ShipServiceBase {

  constructor(
    protected http: Http,
    private shipDesignService: ShipDesignService
  ) { }

  private annotateShipWithDesign(ship: Ship): Observable<Ship> {
    return this.shipDesignService.getShipDesignById(ship.ShipDesignId)
      .map(res => {
        ship.Design = res.exists? res.design : null;
        return ship;
      });
  }

  protected provideShip(ship: Ship): Observable<Ship> {
    return Observable.of(ship)
      .flatMap(res => this.annotateShipWithDesign(ship));
  }
}
