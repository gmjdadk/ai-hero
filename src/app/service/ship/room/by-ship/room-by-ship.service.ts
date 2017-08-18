import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { Ship, Room } from '../../../../model/model.module';
import { RoomServiceBase } from '../base/room.service';
import { RoomDesignService } from '../../../data/room-design/room-design.service';

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
