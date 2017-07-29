import { Injectable } from '@angular/core';

import { UserServiceBase } from '../base/user.service';

@Injectable()
export class UserByTokenService extends UserServiceBase {

  constructor() {
    super();
  }

}