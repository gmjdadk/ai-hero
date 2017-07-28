import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Type, Exclude, plainToClass } from 'class-transformer';

import { RoomDesignService } from '../../data/room-design/room-design.service';
import { Room } from '../../../model/ship/room.model';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

// Rooms you can't walk across
const NON_PASSABLE_ROOMS = ["Wall"];
// Rooms that allow you to move up and down
const VERTICAL_PASSABLE_ROOMS = ["Lift"];
// Rooms with these status should be ignored
const ROOM_STATUS_IGNORE = ["Inventory"];

@Injectable()
export class RoomService {

  constructor(
    private http: Http,
    private roomDesignService: RoomDesignService
  ) { }

  private annotateRoomWithDesign(room: Room): Observable<Room> {
    return this.roomDesignService.getRoomDesignById(room.RoomDesignId)
      .map(res => {
        room.Design = res.exists? res.design : null;
        return room;
      });
  }

  private annotateRoomsWithLinks(rooms: Room[]): Room[] {
    rooms.forEach(r => this.annotateLinksForRoom(r, rooms));
    return rooms;
  }

  private annotateLinksForRoom(room: Room, others: Room[]) {
    // This room is non-passable?
    if (NON_PASSABLE_ROOMS.indexOf(room.Design.RoomType) >= 0) return;
    // Take bottom left edge
    let myPassableX = room.Column;
    let myPassableY = room.Row + room.Design.Rows;
    for (let adjacent of others) {
      // Other room is non-passable?
      if (NON_PASSABLE_ROOMS.indexOf(adjacent.Design.RoomType) >= 0) continue;
      // Does our bottom left edge meet with the other bottom right edge?
      let otherPassableX = adjacent.Column + adjacent.Design.Columns;
      let otherPassableY = adjacent.Row + adjacent.Design.Rows;
      let meetsOnLeftEdge = (myPassableX === otherPassableX /* edges touching */
                            && myPassableY === otherPassableY /* floor eq */);
      if (meetsOnLeftEdge) {
        // Dynamic programming optimisation:
        // We only need to check one side if we push to both list of Links
        room.Links.push(adjacent);
        adjacent.Links.push(room);
      }
      if (VERTICAL_PASSABLE_ROOMS.indexOf(room.Design.RoomType) >= 0) {
        // If it's a lift, add rooms below also. The lift above will add this lift.
        let myOriginX = room.Column;
        let otherOriginX = adjacent.Column;
        let otherClimbableY = adjacent.Row;
        let meetsOnBottomEdge = (myPassableY === otherClimbableY /* bottom touching */
                                && myOriginX === otherOriginX /* left edge eq */);
        if (meetsOnBottomEdge) {
          room.Links.push(adjacent);
          adjacent.Links.push(room);
        }
      }
    }
  }

  getRoomsByToken(token: string): Observable<Room[]> {
    return this.http
      .get('pss:/RoomService/ListRoomsViaAccessToken?accessToken=' + encodeURIComponent(token))
      .map(res => xml.parse(res.text()))
      .map(res => res['ListRoomsViaAccessToken']['Rooms']['Room'])
      .map(res => plainToClass(Room, res as Object[]))
      .map(res => res.filter(c => ROOM_STATUS_IGNORE.indexOf(c.RoomStatus) < 0))
      .map(res => res.map(c => this.annotateRoomWithDesign(c)))
      .flatMap(res => Observable.forkJoin(res))
      .map(res => this.annotateRoomsWithLinks(res));
  }

  getRoomsByTokenMap(token: string): Observable<Map<number, Room>> {
    return this.getRoomsByToken(token)
      .map(res => new Map(res.map(v => [v.RoomId, v] as [number, Room])))
  }
}
