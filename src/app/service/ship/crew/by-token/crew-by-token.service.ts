import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';

import { CharacterDesignService } from '../../../data/character-design/character-design.service';
import { Crew } from '../../../../model/ship/crew.model';

import { CrewServiceBase } from '../base/crew.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class CrewByTokenService extends CrewServiceBase {

  constructor(
    http: Http,
    characterDesignService: CharacterDesignService
  ) {
    super(http, characterDesignService);
  }

  getCrewByToken(token: string): Observable<Crew[]> {
    return this.http
      .get('pss:/CharacterService/ListAllCharactersOfUser?accessToken=' + encodeURIComponent(token))
      .map(res => xml.parse(res.text()))
      .map(res => res['ListAllCharactersOfUser']['Characters']['Character'])
      .map(res => plainToClass(Crew, res as Object[]))
      .flatMap(this.provideCrew);
  }

  getCrewByTokenMap(token: string): Observable<Map<number, Crew>> {
    return this.getCrewByToken(token)
      .map(res => new Map(res.map(v => [v.CharacterId, v] as [number, Crew])))
  }
}
