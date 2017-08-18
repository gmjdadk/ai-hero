import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UserServiceBase } from '../base/user.service';

@Injectable()
export class UserByTokenService extends UserServiceBase {

  constructor(
    protected http: Http
  ) {
    super(http);
  }

}
