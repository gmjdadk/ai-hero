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
export abstract class CrewByInspectionService extends CrewServiceBase {

  constructor(
    http: Http,
    characterDesignService: CharacterDesignService
  ) {
    super(http, characterDesignService);
  }

/*
  getCrewByInspection(userId: number): Observable<Crew[]> {
    TODO
  }
*/
}
