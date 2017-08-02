import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';

import { Observable } from 'rxjs';

const ONE_WEEK_MS = 60 * 60 * 24 * 1 * Math.pow(10, 3);

@Injectable()
export class LocalAdministeredMacService {

  constructor(
    private persistenceService: PersistenceService
  ) { }

  // https://serverfault.com/questions/40712/what-range-of-mac-addresses-can-i-safely-use-for-my-virtual-machines
  mkLocallyAdministeredMac(): string {
    return "xoxxxxxxxxxx"
      .replace(/x/g, () => "0123456789abcdef".charAt(Math.floor(Math.random() * 16)))
      .replace(/o/g, () => "26ae".charAt(Math.floor(Math.random() * 4)));
  }

  getAssignedLam(): Observable<string> {
    return this.persistenceService.createCache("client-lam",
      () => Observable.of(this.mkLocallyAdministeredMac()),
      { type: StorageType.LOCAL, expireAfter: ONE_WEEK_MS }).get();
  }

}
