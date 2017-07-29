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
export abstract class CrewByUserService extends CrewServiceBase {

  constructor(
    http: Http,
    characterDesignService: CharacterDesignService
  ) {
    super(http, characterDesignService);
  }

  // /UserService/SearchUsers?searchString=Zensi
  // filter for only users equal query

  // /ShipService/InspectShip?userId=1214765&accessToken=07f72537-5198-4703-8ea2-10fd95c70949
  // gives all info

/*
  getCrewByInspection(userId: number): Observable<Crew[]> {
    TODO
  }
*/
}
