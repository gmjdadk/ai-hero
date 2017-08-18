import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { CharacterDesign } from '../../../model/model.module';
import { PersistentHttpService, XMLSerializerService } from '../../http/http-service.module';

@Injectable()
export class CharacterDesignService {
  // Data services can be cached as they only change between patches
  private characterDesigns: Observable<CharacterDesign[]>;
  private characterDesignsMap: Observable<Map<number, CharacterDesign>>;

  constructor(
    private http: PersistentHttpService,
    private xmlSerializerService: XMLSerializerService
  ) { }

  preloadCommons(): Observable<{}> {
    return this.getCharacterDesignsMap().flatMap(_ => Observable.empty());
  }

  getCharacterDesigns(): Observable<CharacterDesign[]> {
    return this.characterDesigns
      ? this.characterDesigns
      : this.characterDesigns = this.http
        .get('x-cache:43200,[pss:/CharacterService/ListAllCharacterDesigns2?languageKey=en]', {})
        .map(res => this.xmlSerializerService.unserialise(res.text()))
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
      .map(res => ({ exists: res !== undefined, design: res }));
  }
}
