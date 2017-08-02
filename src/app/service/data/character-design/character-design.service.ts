import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';
import { PersistenceService, StorageType } from 'angular-persistence';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

import { CharacterDesign } from '../../../model/data/character-design.model';

@Injectable()
export class CharacterDesignService {
  // Data services can be cached as they only change between patches
  private characterDesigns: Observable<CharacterDesign[]>;
  private characterDesignsMap: Observable<Map<number, CharacterDesign>>;

  constructor(private http: Http) { }

  getCharacterDesigns(): Observable<CharacterDesign[]> {
    return this.characterDesigns
      ? this.characterDesigns
      : this.characterDesigns = this.http
        .get('pss:/CharacterService/ListAllCharacterDesigns2?languageKey=en', {})
        .map(res => xml.parse(res.text()))
        .map(res => res['ListAllCharacterDesigns']['CharacterDesigns']['CharacterDesign'])
        .map(res => plainToClass(CharacterDesign, res as Object[]))
        .publishReplay(1)
        .refCount();
  }

  getCharacterDesignsMap(): Observable<Map<number, CharacterDesign>> {
    return this.characterDesignsMap
      ? this.characterDesignsMap
      : this.characterDesignsMap = this.getCharacterDesigns()
        .map(res => new Map(res.map(v => [v.CharacterDesignId, v] as [number, CharacterDesign])))
        .publishReplay(1)
        .refCount();
  }

  getCharacterDesignById(id: number): Observable<{ exists: boolean, design?: CharacterDesign }> {
    return this.getCharacterDesignsMap()
      .map(res => res.get(id))
      .map(res => { return { exists: res !== undefined, design: res } });
  }
}
