import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
    protected http: Http,
    private userByIdentifierService: UserByIdentifierService
  ) {
    super(http);
  }

  getUserByName(token: string, name: string): Observable<User> {
    return this.http
      .get('pss:/UserService/SearchUsers?searchString=' + encodeURIComponent(name))
      .map(res => xml.parse(res.text()))
      .map(res => res['SearchUsers']['Users']['User'])
      .map(res => res.filter(u => u['Name'] === name))
      .map(res => parseInt(res[0]['Id']))
      .flatMap(id => this.userByIdentifierService.getUserByIdentifier(token, id));
  }
}