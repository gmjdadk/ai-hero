import { Injectable } from '@angular/core';

import { UserServiceBase } from '../base/user.service';

@Injectable()
export class UserByNameService extends UserServiceBase {

  constructor() {
    super();
  }

}