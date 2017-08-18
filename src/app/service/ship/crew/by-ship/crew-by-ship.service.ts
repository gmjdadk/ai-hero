import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';

import { CharacterDesignService } from '../../../data/data-service.module';
import { CrewServiceBase } from '../base/crew.service';

@Injectable()
export class CrewByShipService extends CrewServiceBase {

  constructor(
    http: Http,
    characterDesignService: CharacterDesignService
  ) {
    super(http, characterDesignService);
  }

  // TODO
}
