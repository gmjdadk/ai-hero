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
export class UserByIdentifierService extends UserServiceBase {

  constructor(
    protected http: Http
  ) {
    super(http);
  }

  getUserByIdentifier(token: string, uid: number): Observable<{exists: boolean, user?: User}> {
    return this.http
      .get('pss:/ShipService/InspectShip?userId=' + encodeURIComponent(uid.toString()) + '&accessToken=' + encodeURIComponent(token))
      .map(res => xml.parse(res.text()))
      .map(res => res['InspectShip'])
      .map(res => [ res['User'], res['Ship'] ])
      .map(res => {
        let [rawUser, rawShip] = res;
        let user = plainToClass(User, rawUser as Object);
        user.MetaRawShip = rawShip;
        return user;
      })
      .map(res => { return { exists: true, user: res } })
      .catch(err => Observable.of({ exists: false }));
  }
}
