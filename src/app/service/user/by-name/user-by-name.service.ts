import { Injectable } from '@angular/core';
import { PersistentHttpService } from '../../http/persistent/persistent-http.service';
import { plainToClass } from 'class-transformer';

import { User } from '../../../model/user/user.model';
import { Ship } from '../../../model/ship/ship.model';
import { UserServiceBase } from '../base/user.service';
import { UserByIdentifierService } from '../by-identifier/user-by-identifier.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class UserByNameService extends UserServiceBase {

  constructor(
    protected http: PersistentHttpService,
    private userByIdentifierService: UserByIdentifierService
  ) {
    super(http);
  }

  // FIXME: This only returns a user snapshot, not a full user
  getUserByName(token: string, name: string): Observable<{exists: boolean, user?: User}> {
    return this.getAllUsersMatching(token, name)
      .map(res => res[0].Id)
      .flatMap(uid => this.userByIdentifierService.getUserByIdentifier(token, uid))
      .catch(err => Observable.of({ exists: false }));
  }

  // FIXME: This only returns a user snapshot, not a full user
  getAllUsersMatching(token: string, name: string): Observable<User[]> {
    return this.http
      .get('x-cache:180,[pss:/UserService/SearchUsers?searchString=' + encodeURIComponent(name) + ']')
      .map(res => xml.parse(res.text()))
      .map(res => res['SearchUsers']['Users']['User'])
      .map(res => Array.isArray(res)? res : [res]);
  }
}