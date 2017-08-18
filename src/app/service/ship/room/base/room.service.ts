import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { Room } from '../../../../model/model.module';
import { RoomDesignService } from '../../../data/room-design/room-design.service';

// Rooms you can't walk across
const NON_PASSABLE_ROOMS = ['Wall'];
// Rooms that allow you to move up and down
const VERTICAL_PASSABLE_ROOMS = ['Lift'];
// Rooms with these status should be ignored
const ROOM_STATUS_IGNORE = ['Inventory'];

export abstract class RoomServiceBase {

  constructor(
    protected http: Http,
    private roomDesignService: RoomDesignService
  ) { }

  private annotateRoomWithDesign(room: Room): Observable<Room> {
    return this.roomDesignService.getRoomDesignById(room.RoomDesignId)
      .map(res => {
        room.Design = res.exists ? res.design : null;
        return room;
      });
  }

  private annotateRoomsWithLinks(rooms: Room[]): Room[] {
    rooms.forEach(r => this.annotateLinksForRoom(r, rooms));
    return rooms;
  }

  private annotateLinksForRoom(room: Room, others: Room[]) {
    // This room is non-passable?
    if (NON_PASSABLE_ROOMS.indexOf(room.Design.RoomType) >= 0) { return; }
    // Take bottom left edge
    const myPassableX = room.Column;
    const myPassableY = room.Row + room.Design.Rows;
    for (const adjacent of others) {
      // Other room is non-passable?
      if (NON_PASSABLE_ROOMS.indexOf(adjacent.Design.RoomType) >= 0) { continue; }
      // Does our bottom left edge meet with the other bottom right edge?
      const otherPassableX = adjacent.Column + adjacent.Design.Columns;
      const otherPassableY = adjacent.Row + adjacent.Design.Rows;
      const meetsOnLeftEdge = (myPassableX === otherPassableX /* edges touching */
                            && myPassableY === otherPassableY /* floor eq */);
      if (meetsOnLeftEdge) {
        // Dynamic programming optimisation:
        // We only need to check one side if we push to both list of Links
        room.Links.push(adjacent);
        adjacent.Links.push(room);
      }
      if (VERTICAL_PASSABLE_ROOMS.indexOf(room.Design.RoomType) >= 0) {
        // If it's a lift, add rooms below also. The lift above will add this lift.
        const myOriginX = room.Column;
        const otherOriginX = adjacent.Column;
        const otherClimbableY = adjacent.Row;
        const meetsOnBottomEdge = (myPassableY === otherClimbableY /* bottom touching */
                                && myOriginX === otherOriginX /* left edge eq */);
        if (meetsOnBottomEdge) {
          room.Links.push(adjacent);
          adjacent.Links.push(room);
        }
      }
    }
  }

  protected provideRooms(rooms: Room[]): Observable<Room[]> {
    return Observable.of(rooms)
      .map(res => res.filter(c => ROOM_STATUS_IGNORE.indexOf(c.RoomStatus) < 0))
      .map(res => res.map(c => this.annotateRoomWithDesign(c)))
      .flatMap(res => Observable.forkJoin(res))
      .map(res => this.annotateRoomsWithLinks(res));
  }
}
