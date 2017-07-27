import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Type, Exclude, plainToClass } from 'class-transformer';
import { File, FileService } from './file.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

export class Sprite {
  @Type(() => Number) Height: number;
  @Type(() => Number) ImageFileId: number;
  @Type(() => Number) SpriteId: number;
  @Type(() => String) SpriteKey: string;
  @Type(() => Number) Width: number;
  @Type(() => Number) X: number;
  @Type(() => Number) Y: number;

  @Exclude() File: File;
}

@Injectable()
export class SpriteService {
  // Data services can be cached as they only change between patches
  private sprites: Observable<Sprite[]>;
  private spritesMap: Observable<Map<number, Sprite>>;

  constructor(
    private http: Http,
    private fileService: FileService
  ) { }

  private annotateSpriteWithSourceFile(sprite: Sprite): Observable<Sprite> {
    return this.fileService.getFileById(sprite.ImageFileId)
      .map(res => {
        sprite.File = res.exists? res.file : null;
        return sprite;
      });
  }

  getSprites(): Observable<Sprite[]> {
    return this.sprites
      ? this.sprites
      : this.sprites = this.http
        .get('pss:/FileService/ListSprites', {})
        .map(res => xml.parse(res.text()))
        .map(res => res['ListSprites']['Sprites']['Sprite'])
        .map(res => plainToClass(Sprite, res as Object[]))
        .map(res => res.map(c => this.annotateSpriteWithSourceFile(c)))
        .flatMap(res => Observable.forkJoin(res))
        .publishReplay(1)
        .refCount();
  }

  getSpritesMap(): Observable<Map<number, Sprite>> {
    return this.spritesMap
      ? this.spritesMap
      : this.spritesMap = this.getSprites()
        .map(res => new Map(res.map(v => [v.SpriteId, v] as [number, Sprite])))
        .publishReplay(1)
        .refCount();
  }

  getSpriteById(id: number): Observable<{ exists: boolean, sprite?: Sprite }> {
    return this.getSpritesMap()
      .map(res => res.get(id))
      .map(res => { return { exists: res !== undefined, sprite: res } });
  }
}