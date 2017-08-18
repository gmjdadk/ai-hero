import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Ship } from '../../../../model/model.module';
import { ShipDesignService } from '../../../data/ship-design/ship-design.service';

export abstract class ShipServiceBase {

  constructor(
    protected http: Http,
    private shipDesignService: ShipDesignService
  ) { }

  private annotateShipWithDesign(ship: Ship): Observable<Ship> {
    return this.shipDesignService.getShipDesignById(ship.ShipDesignId)
      .map(res => {
        ship.Design = res.exists ? res.design : null;
        return ship;
      });
  }

  protected provideShip(ship: Ship): Observable<Ship> {
    return Observable.of(ship)
      .flatMap(res => this.annotateShipWithDesign(ship));
  }
}
