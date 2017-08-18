import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { PersistentHttpService, XMLSerializerService } from '../../../http/http-service.module';
import { Room } from '../../../../model/model.module';
import { RoomServiceBase } from '../base/room.service';
import { RoomDesignService } from '../../../data/room-design/room-design.service';

@Injectable()
export class RoomByTokenService extends RoomServiceBase {

  constructor(
    http: PersistentHttpService,
    roomDesignService: RoomDesignService,
    private xmlSerializerService: XMLSerializerService
  ) {
    super(http, roomDesignService);
  }

  getRoomsByToken(token: string): Observable<Room[]> {
    return this.http
      .get('x-cache:15,[pss:/RoomService/ListRoomsViaAccessToken?accessToken=]' + encodeURIComponent(token))
      .map(res => this.xmlSerializerService.unserialise(res.text()))
      .map(res => res['ListRoomsViaAccessToken']['Rooms']['Room'])
      .map(res => plainToClass(Room, res as Object[]))
      .flatMap(res => this.provideRooms(res));
  }

  getRoomsByTokenMap(token: string): Observable<Map<number, Room>> {
    return this.getRoomsByToken(token)
      .map(res => new Map(res.map(v => [v.RoomId, v] as [number, Room])));
  }
}
