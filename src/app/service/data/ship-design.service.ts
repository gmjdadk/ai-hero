import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Type, plainToClass } from 'class-transformer';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

export class ShipDesign {
  @Type(() => Boolean) AllowInteracial: boolean;
  @Type(() => Number) Columns: number;
  @Type(() => Number) DoorFrameLeftFileId: number;
  @Type(() => Number) DoorFrameLeftSpriteId: number;
  @Type(() => Number) DoorFrameRightFileId: number;
  @Type(() => Number) DoorFrameRightSpriteId: number;
  @Type(() => Number) EngineX: number;
  @Type(() => Number) EngineY: number;
  @Type(() => Number) EquipmentCapacity: number;
  @Type(() => Number) ExteriorFileId: number;
  @Type(() => Number) ExteriorSpriteId: number;
  @Type(() => Number) FlagX: number;
  @Type(() => Number) FlagY: number;
  @Type(() => Number) GasCapacity: number;
  @Type(() => Number) Hp: number;
  @Type(() => Number) InteriorFileId: number;
  @Type(() => Number) InteriorSpriteId: number;
  @Type(() => Number) LiftFileId: number;
  @Type(() => Number) LiftSpriteId: number;
  @Type(() => Number) LogoFileId: number;
  @Type(() => Number) LogoSpriteId: number;
  @Type(() => String) Mask: string;
  @Type(() => Number) MineralCapacity: number;
  @Type(() => Number) MineralCost: number;
  @Type(() => Number) MiniShipSpriteId: number;
  @Type(() => Number) RaceId: number;
  @Type(() => Number) RepairTime: number;
  @Type(() => Number) RequiredResearchDesignId: number;
  @Type(() => Number) RequiredShipDesignId: number;
  @Type(() => Number) RoomFrameFileId: number;
  @Type(() => Number) RoomFrameSpriteId: number;
  @Type(() => Number) Rows: number;
  @Type(() => String) ShipDescription: string;
  @Type(() => Number) ShipDesignId: number;
  @Type(() => String) ShipDesignName: string;
  @Type(() => Number) ShipLevel: number;
  @Type(() => String) ShipType: string;
  @Type(() => Number) StarbuxCost: number;
  @Type(() => Number) ThrustLineAnimationId: number;
  @Type(() => Number) ThrustParticleSpriteId: number;
  @Type(() => Number) ThrustScale: number;
  @Type(() => Number) UpgradeOffsetColumns: number;
  @Type(() => Number) UpgradeOffsetRows: number;
  @Type(() => Number) UpgradeTime: number;
}

@Injectable()
export class ShipDesignService {
  // Data services can be cached as they only change between patches
  private shipDesigns: Observable<ShipDesign[]>;
  private shipDesignsMap: Observable<Map<number, ShipDesign>>;

  constructor(private http: Http) { }

  getShipDesigns(): Observable<ShipDesign[]> {
    return this.shipDesigns
      ? this.shipDesigns
      : this.shipDesigns = this.http
        .get('pss:/ShipService/ListAllShipDesigns2?languageKey=en', {})
        .map(res => xml.parse(res.text()))
        .map(res => res['ListShipDesigns']['ShipDesigns']['ShipDesign'])
        .map(res => plainToClass(ShipDesign, res as Object[]))
        .publishReplay(1)
        .refCount();
  }
  
  getShipDesignsMap(): Observable<Map<number, ShipDesign>> {
    return this.shipDesignsMap
      ? this.shipDesignsMap
      : this.shipDesignsMap = this.getShipDesigns()
        .map(res => new Map(res.map(v => [v.ShipDesignId, v] as [number, ShipDesign])))
        .publishReplay(1)
        .refCount();
  }

  getShipDesignById(id: number): Observable<{ exists: boolean, design?: ShipDesign }> {
    return this.getShipDesignsMap()
      .map(res => res.get(id))
      .map(res => { return { exists: res !== undefined, design: res } });
  }
}
