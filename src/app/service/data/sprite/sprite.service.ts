import { Injectable } from '@angular/core';
import { PersistentHttpService } from '../../http/persistent/persistent-http.service';
import { Type, Exclude, plainToClass } from 'class-transformer';
import { FileService } from '../file/file.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

import { StaticSprite } from '../../../model/data/static-sprite.model';

@Injectable()
export class SpriteService {
  // Data services can be cached as they only change between patches
  private sprites: Observable<StaticSprite[]>;
  private spritesMap: Observable<Map<number, StaticSprite>>;

  constructor(
    private http: PersistentHttpService,
    private fileService: FileService
  ) { }

  preloadCommons(): Observable<{}> {
    return this.getSpritesMap().flatMap(_ => Observable.empty());
  }

  private annotateSpriteWithSourceFile(sprite: StaticSprite): Observable<StaticSprite> {
    return this.fileService.getFileById(sprite.ImageFileId)
      .map(res => {
        sprite.File = res.exists? res.file : null;
        return sprite;
      });
  }

  getSprites(): Observable<StaticSprite[]> {
    return this.sprites
      ? this.sprites
      : this.sprites = this.http
        .get('x-cache:43200,pss:/FileService/ListSprites', {})
        .map(res => xml.parse(res.text()))
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
      .map(res => { return { exists: res !== undefined, sprite: res } });
  }
}