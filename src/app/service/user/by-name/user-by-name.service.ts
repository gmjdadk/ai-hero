import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { PersistentHttpService, XMLSerializerService } from '../../http/http-service.module';
import { UserBrief, Ship } from '../../../model/model.module';
import { UserServiceBase } from '../base/user.service';
import { UserByIdentifierService } from '../by-identifier/user-by-identifier.service';

@Injectable()
export class UserByNameService extends UserServiceBase {

  constructor(
    protected http: PersistentHttpService,
    private userByIdentifierService: UserByIdentifierService,
    private xmlSerializerService: XMLSerializerService
  ) {
    super(http);
  }

  getUserByName(token: string, name: string): Observable<{exists: boolean, user?: UserBrief}> {
    return this.getAllUsersMatching(token, name)
      .map(res => res[0].Id)
      .flatMap(uid => this.userByIdentifierService.getUserByIdentifier(token, uid))
      .catch(err => Observable.of({ exists: false }));
  }

  getAllUsersMatching(token: string, name: string): Observable<UserBrief[]> {
    return this.http
      .get('x-cache:180,[pss:/UserService/SearchUsers?searchString=' + encodeURIComponent(name) + ']')
      .map(res => this.xmlSerializerService.unserialise(res.text()))
      .map(res => res['SearchUsers']['Users']['User'])
      .map(res => this.xmlSerializerService.asArray(res));
  }
}
