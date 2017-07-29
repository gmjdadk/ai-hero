import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';

import { RoomDesignService } from '../../../data/room-design/room-design.service';
import { Room } from '../../../../model/ship/room.model';

import { RoomServiceBase } from '../base/room.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class RoomByTokenService extends RoomServiceBase {

  constructor(
    http: Http,
    roomDesignService: RoomDesignService
  ) {
    super(http, roomDesignService);
  }

  getRoomsByToken(token: string): Observable<Room[]> {
    return this.http
      .get('pss:/RoomService/ListRoomsViaAccessToken?accessToken=' + encodeURIComponent(token))
      .map(res => xml.parse(res.text()))
      .map(res => res['ListRoomsViaAccessToken']['Rooms']['Room'])
      .map(res => plainToClass(Room, res as Object[]))
      .flatMap(res => this.provideRooms(res));
  }

  getRoomsByTokenMap(token: string): Observable<Map<number, Room>> {
    return this.getRoomsByToken(token)
      .map(res => new Map(res.map(v => [v.RoomId, v] as [number, Room])))
  }
}
