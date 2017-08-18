import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { PersistentHttpService, XMLSerializerService } from '../../../http/http-service.module';
import { Crew } from '../../../../model/model.module';
import { CrewServiceBase } from '../base/crew.service';
import { CharacterDesignService } from '../../../data/character-design/character-design.service';

@Injectable()
export class CrewByTokenService extends CrewServiceBase {

  constructor(
    http: PersistentHttpService,
    characterDesignService: CharacterDesignService,
    private xmlSerializerService: XMLSerializerService
  ) {
    super(http, characterDesignService);
  }

  getCrewByToken(token: string): Observable<Crew[]> {
    return this.http
      .get('pss:/CharacterService/ListAllCharactersOfUser?accessToken=' + encodeURIComponent(token))
      .map(res => this.xmlSerializerService.unserialise(res.text()))
      .map(res => res['ListAllCharactersOfUser']['Characters']['Character'])
      .map(res => plainToClass(Crew, res as Object[]))
      .flatMap(this.provideCrew);
  }

  getCrewByTokenMap(token: string): Observable<Map<number, Crew>> {
    return this.getCrewByToken(token)
      .map(res => new Map(res.map(v => [v.CharacterId, v] as [number, Crew])));
  }
}
