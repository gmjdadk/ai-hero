import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Type, Exclude, plainToClass } from 'class-transformer';

import { RoomDesign, RoomDesignService } from '../data/room-design.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

export class Room {
  @Type(() => Number) CapacityUsed: number;
  @Type(() => Number) Column: number;
  @Type(() => Date) ConstructionStartDate: Date;
  @Type(() => String) ItemIds: string;
  @Type(() => String) ManufactureItemDesignIds: string;
  @Type(() => Date) ManufactureStartDate: Date;
  @Type(() => String) Manufactured: string;
  @Type(() => Number) PowerGenerated: number;
  @Type(() => Number) RandomSeed: number;
  @Type(() => Number) RoomDesignId: number;
  @Type(() => Number) RoomId: number;
  @Type(() => String) RoomStatus: string;
  @Type(() => Number) Row: number;
  @Type(() => Number) ShipId: number;
  @Type(() => Number) UpgradeRoomDesignId: number;

  @Exclude() Design: RoomDesign;
  @Exclude() Links: Room[] = [];
}

// Rooms you can't walk across
const NON_PASSABLE_ROOMS = ["Wall"];
// Rooms that allow you to move up and down
const VERTICAL_PASSABLE_ROOMS = ["Lift"];

@Injectable()
export class RoomService {

  constructor(
    private http: Http,
    private roomDesignService: RoomDesignService
  ) { }

  private annotateRoomWithDesign(room: Room): Observable<Room> {
    let clone = Object.assign(Object.create(Object.getPrototypeOf(room)), room);
    return this.roomDesignService.getRoomDesignById(room.RoomDesignId)
      .map(res => {
        clone.Design = res.exists? res.design : null;
        return clone;
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
      .map(res => res.map(c => this.annotateRoomWithDesign(c)))
      .flatMap(res => Observable.forkJoin(res))
      .map(res => this.annotateRoomsWithLinks(res));
  }

  getRoomsByTokenMap(token: string): Observable<Map<number, Room>> {
    return this.getRoomsByToken(token)
      .map(res => new Map(res.map(v => [v.RoomId, v] as [number, Room])))
  }
}
