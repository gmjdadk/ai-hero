import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserServiceBase {

  constructor(
    protected http: Http
  ) { }

}
