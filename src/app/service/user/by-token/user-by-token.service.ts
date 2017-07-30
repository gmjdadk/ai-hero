import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { plainToClass } from 'class-transformer';

import { User } from '../../../model/user/user.model';
import { Ship } from '../../../model/ship/ship.model';
import { UserServiceBase } from '../base/user.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class UserByTokenService extends UserServiceBase {

  constructor(
    protected http: Http
  ) {
    super(http);
  }

}