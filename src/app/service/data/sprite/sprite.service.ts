import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { StaticSprite } from '../../../model/model.module';
import { FileService } from '../file/file.service';
import { PersistentHttpService, XMLSerializerService } from '../../http/http-service.module';

@Injectable()
export class SpriteService {
  // Data services can be cached as they only change between patches
  private sprites: Observable<StaticSprite[]>;
  private spritesMap: Observable<Map<number, StaticSprite>>;

  constructor(
    private http: PersistentHttpService,
    private xmlSerializerService: XMLSerializerService,
    private fileService: FileService
  ) { }

  preloadCommons(): Observable<{}> {
    return this.getSpritesMap().flatMap(_ => Observable.empty());
  }

  private annotateSpriteWithSourceFile(sprite: StaticSprite): Observable<StaticSprite> {
    return this.fileService.getFileById(sprite.ImageFileId)
      .map(res => {
        sprite.File = res.exists ? res.file : null;
        return sprite;
      });
  }

  getSprites(): Observable<StaticSprite[]> {
    return this.sprites
      ? this.sprites
      : this.sprites = this.http
        .get('x-cache:43200,[pss:/FileService/ListSprites]', {})
        .map(res => this.xmlSerializerService.unserialise(res.text()))
        .map(res => res['ListSprites']['Sprites']['Sprite'])
        .map(res => plainToClass(StaticSprite, res as Object[]))
        .map(res => res.map(c => this.annotateSpriteWithSourceFile(c)))
        .flatMap(res => Observable.forkJoin(res))
        .publishReplay(1)
        .refCount();
  }

  getSpritesMap(): Observable<Map<number, StaticSprite>> {
    return this.spritesMap
      ? this.spritesMap
      : this.spritesMap = this.getSprites()
        .map(res => new Map(res.map(v => [v.SpriteId, v] as [number, StaticSprite])))
        .publishReplay(1)
        .refCount();
  }

  getSpriteById(id: number): Observable<{ exists: boolean, sprite?: StaticSprite }> {
    return this.getSpritesMap()
      .map(res => res.get(id))
      .map(res => ({ exists: res !== undefined, sprite: res }));
  }
}
