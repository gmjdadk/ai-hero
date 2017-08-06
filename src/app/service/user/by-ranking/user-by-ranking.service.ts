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
export class UserByRankingService extends UserServiceBase {

  constructor(
    protected http: PersistentHttpService,
    private userByIdentifierService: UserByIdentifierService
  ) {
    super(http);
  }

  // Returns users in ascending order - first is highest ranked
  getUsersByRanking(token: string, start: number = 1, end: number = 100): Observable<User[]> {
    return this.http
      .get('x-cache:600,pss:/LadderService/ListUsersByRanking' +
        '?from=' + encodeURIComponent(start.toString()) +
        '&to=' + encodeURIComponent(end.toString()) +
        '&accessToken=' + encodeURIComponent(token))
      .map(res => xml.parse(res.text()))
      .map(res => res['ListUsersByRanking']['Users']['User'])
      .map(res => plainToClass(User, res as Object[]))
      .catch(err => Observable.of({ exists: false }));
  }
}