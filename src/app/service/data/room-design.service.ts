import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Type, Exclude, plainToClass } from 'class-transformer';
import { Sprite, SpriteService } from './sprite.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

export class RoomDesign {
  @Type(() => Number) Capacity: number;
  @Type(() => String) CategoryType: string;
  @Type(() => Number) Columns: number;
  @Type(() => Number) ConstructionSpriteId: number;
  @Type(() => Number) ConstructionTime: number;
  @Type(() => Number) DefaultDefenceBonus: number;
  @Type(() => Boolean) FlipOnEnemyShip: Boolean;
  @Type(() => Number) GasCost: number;
  @Type(() => Number) ImageSpriteId: number;
  @Type(() => Number) ImprovementAmounts: number;
  @Type(() => Number) ItemRank: number;
  @Type(() => Number) Level: number;
  @Type(() => Number) LogoSpriteId: number;
  @Type(() => Number) ManufactureCapacity: number;
  @Type(() => Number) ManufactureRate: number;
  @Type(() => String) ManufactureType: string;
  @Type(() => Number) MaxPowerGenerated: number;
  @Type(() => Number) MaxSystemPower: number;
  @Type(() => Number) MinShipLevel: number;
  @Type(() => Number) MineralCost: number;
  @Type(() => Number) MissileDesignId: number;
  @Type(() => String) PriceString: string;
  @Type(() => Number) RaceId: number;
  @Type(() => Number) RandomImprovements: number;
  @Type(() => Number) RefillUnitCost: number;
  @Type(() => Number) ReloadTime: number;
  @Type(() => String) RoomDescription: string;
  @Type(() => Number) RoomDesignId: number;
  @Type(() => String) RoomName: string;
  @Type(() => String) RoomShortName: string;
  @Type(() => String) RoomType: string;
  @Type(() => Number) RootRoomDesignId: number;
  @Type(() => Boolean) Rotate: boolean;
  @Type(() => Number) Rows: number;
  @Type(() => Number) UpgradeFromRoomDesignId: number;

  @Exclude() Sprite: Sprite;
}

@Injectable()
export class RoomDesignService {
  // Data services can be cached as they only change between patches
  private roomDesigns: Observable<RoomDesign[]>;
  private roomDesignsMap: Observable<Map<number, RoomDesign>>;

  constructor(
    private http: Http,
    private spriteService: SpriteService
  ) { }

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
