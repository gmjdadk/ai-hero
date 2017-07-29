import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';

import { RoomDesignService } from '../../../data/room-design/room-design.service';
import { Ship } from '../../../../model/ship/ship.model';
import { Room } from '../../../../model/ship/room.model';

import { RoomServiceBase } from '../base/room.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class RoomByShipService extends RoomServiceBase {

  constructor(
    http: Http,
    roomDesignService: RoomDesignService
  ) {
    super(http, roomDesignService);
  }

  getRoomsByShip(ship: Ship): Observable<Room[]> {
    return Observable.of(ship)
      .map(res => plainToClass(Room, ship.MetaRawRooms as Object[]))
      .flatMap(res => this.provideRooms(res));
  }
}