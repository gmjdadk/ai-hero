import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { ShipDesign } from '../../../model/model.module';
import { SpriteService } from '../sprite/sprite.service';
import { PersistentHttpService, XMLSerializerService } from '../../http/http-service.module';

@Injectable()
export class ShipDesignService {
  // Data services can be cached as they only change between patches
  private shipDesigns: Observable<ShipDesign[]>;
  private shipDesignsMap: Observable<Map<number, ShipDesign>>;

  constructor(
    private http: PersistentHttpService,
    private xmlSerializerService: XMLSerializerService,
    private spriteService: SpriteService
  ) { }

  preloadCommons(): Observable<{}> {
    return this.getShipDesignsMap().flatMap(_ => Observable.empty());
  }

  private annotateShipDesignWithSprites(ship: ShipDesign): Observable<ShipDesign> {
    return Observable.forkJoin([
        this.spriteService.getSpriteById(ship.InteriorSpriteId),
        this.spriteService.getSpriteById(ship.ExteriorSpriteId),
        this.spriteService.getSpriteById(ship.MiniShipSpriteId)
      ]).map(res => {
        const [interior, exterior, small] = res;
        ship.BackgroundSprite = interior.exists ? interior.sprite : null;
        ship.ForegroundSprite = exterior.exists ? exterior.sprite : null;
        ship.SmallShipSprite = small.exists ? small.sprite : null;
        return ship;
      });
  }

  getShipDesigns(): Observable<ShipDesign[]> {
    return this.shipDesigns
      ? this.shipDesigns
      : this.shipDesigns = this.http
        .get('x-cache:43200,[pss:/ShipService/ListAllShipDesigns2?languageKey=en]', {})
        .map(res => this.xmlSerializerService.unserialise(res.text()))
        .map(res => res['ListShipDesigns']['ShipDesigns']['ShipDesign'])
        .map(res => plainToClass(ShipDesign, res as Object[]))
        .map(res => res.map(c => this.annotateShipDesignWithSprites(c)))
        .flatMap(res => Observable.forkJoin(res))
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
      .map(res => ({ exists: res !== undefined, design: res }));
  }
}
