import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { PersistentHttpService, XMLSerializerService } from '../../http/http-service.module';
import { User, Ship } from '../../../model/model.module';
import { UserServiceBase } from '../base/user.service';

@Injectable()
export class UserByIdentifierService extends UserServiceBase {

  constructor(
    protected http: PersistentHttpService,
    private xmlSerializerService: XMLSerializerService
  ) {
    super(http);
  }

  getUserByIdentifier(token: string, uid: number): Observable<{exists: boolean, user?: User}> {
    return this.http
      .get('x-cache:60,[pss:/ShipService/InspectShip' +
        '?userId=' + encodeURIComponent(uid.toString()) +
        '&accessToken=]' + encodeURIComponent(token))
      .map(res => this.xmlSerializerService.unserialise(res.text()))
      .map(res => res['InspectShip'])
      .map(res => [ res['User'], res['Ship'] ])
      .map(res => {
        const [rawUser, rawShip] = res;
        const user = plainToClass(User, rawUser as Object);
        user.MetaRawShip = rawShip;
        return user;
      })
      .map(res => ({ exists: true, user: res }))
      .catch(err => Observable.of({ exists: false }));
  }
}
