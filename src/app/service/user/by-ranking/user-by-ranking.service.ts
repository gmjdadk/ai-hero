import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { PersistentHttpService, XMLSerializerService } from '../../http/http-service.module';
import { UserBrief } from '../../../model/model.module';
import { UserServiceBase } from '../base/user.service';
import { UserByIdentifierService } from '../by-identifier/user-by-identifier.service';

@Injectable()
export class UserByRankingService extends UserServiceBase {

  constructor(
    protected http: PersistentHttpService,
    private userByIdentifierService: UserByIdentifierService,
    private xmlSerializerService: XMLSerializerService
  ) {
    super(http);
  }

  // Returns users in ascending order - first is highest ranked
  // Note: The PSS API has a bug and will send you 1-100 regardless of the range you specify.
  getUsersByRanking(token: string, start: number = 1, end: number = 100): Observable<UserBrief[]> {
    return this.http
      .get('x-cache:600,[pss:/LadderService/ListUsersByRanking' +
        '?from=' + encodeURIComponent(start.toString()) +
        '&to=' + encodeURIComponent(end.toString()) +
        '&accessToken=]' + encodeURIComponent(token))
      .map(res => this.xmlSerializerService.unserialise(res.text()))
      .map(res => res['ListUsersByRanking']['Users']['User'])
      .map(res => plainToClass(UserBrief, res as Object[]))
      .catch(err => Observable.of(null));
  }
}
