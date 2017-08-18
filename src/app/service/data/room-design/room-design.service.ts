import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { RoomDesign } from '../../../model/model.module';
import { SpriteService } from '../sprite/sprite.service';
import { PersistentHttpService, XMLSerializerService } from '../../http/http-service.module';

@Injectable()
export class RoomDesignService {
  // Data services can be cached as they only change between patches
  private roomDesigns: Observable<RoomDesign[]>;
  private roomDesignsMap: Observable<Map<number, RoomDesign>>;

  constructor(
    private http: PersistentHttpService,
    private xmlSerializerService: XMLSerializerService,
    private spriteService: SpriteService
  ) { }

  preloadCommons(): Observable<{}> {
    return this.getRoomDesignsMap().flatMap(_ => Observable.empty());
  }

  private annotateRoomDesignWithSprite(room: RoomDesign): Observable<RoomDesign> {
    return this.spriteService.getSpriteById(room.ImageSpriteId)
      .map(res => {
        room.Sprite = res.exists ? res.sprite : null;
        return room;
      });
  }

  getRoomDesigns(): Observable<RoomDesign[]> {
    return this.roomDesigns
      ? this.roomDesigns
      : this.roomDesigns = this.http
        .get('x-cache:43200,[pss:/RoomService/ListRoomDesigns2?languageKey=en]', {})
        .map(res => this.xmlSerializerService.unserialise(res.text()))
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
      .map(res => ({ exists: res !== undefined, design: res }));
  }
}
