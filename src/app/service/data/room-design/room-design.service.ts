import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';
import { SpriteService } from '../sprite/sprite.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

import { RoomDesign } from '../../../model/data/room-design.model';

@Injectable()
export class RoomDesignService {
  // Data services can be cached as they only change between patches
  private roomDesigns: Observable<RoomDesign[]>;
  private roomDesignsMap: Observable<Map<number, RoomDesign>>;

  constructor(
    private http: Http,
    private spriteService: SpriteService
  ) { }

  preloadCommons(): Observable<{}> {
    return this.getRoomDesignsMap().flatMap(_ => Observable.empty());
  }

  private annotateRoomDesignWithSprite(room: RoomDesign): Observable<RoomDesign> {
    return this.spriteService.getSpriteById(room.ImageSpriteId)
      .map(res => {
        room.Sprite = res.exists? res.sprite : null;
        return room;
      });
  }

  getRoomDesigns(): Observable<RoomDesign[]> {
    return this.roomDesigns
      ? this.roomDesigns
      : this.roomDesigns = this.http
        .get('pss:/RoomService/ListRoomDesigns2?languageKey=en', {})
        .map(res => xml.parse(res.text()))
        .map(res => res['ListRoomDesigns']['RoomDesigns']['RoomDesign'])
        .map(res => plainToClass(RoomDesign, res as Object[]))
        .map(res => res.map(c => this.annotateRoomDesignWithSprite(c)))
        .flatMap(res => Observable.forkJoin(res))
        .publishReplay(1)
        .refCount();
  }

  getRoomDesignsMap(): Observable<Map<number, RoomDesign>> {
    return this.roomDesignsMap
      ? this.roomDesignsMap
      : this.roomDesignsMap = this.getRoomDesigns()
        .map(res => new Map(res.map(v => [v.RoomDesignId, v] as [number, RoomDesign])))
        .publishReplay(1)
        .refCount();
  }

  getRoomDesignById(id: number): Observable<{ exists: boolean, design?: RoomDesign }> {
    return this.getRoomDesignsMap()
      .map(res => res.get(id))
      .map(res => { return { exists: res !== undefined, design: res } });
  }
}
