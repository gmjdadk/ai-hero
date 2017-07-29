import { Injectable } from '@angular/core';

import { UserServiceBase } from '../base/user.service';

@Injectable()
export class UserByIdentifierService extends UserServiceBase {

  constructor() {
    super();
  }

}
