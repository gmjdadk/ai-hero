import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TokenServiceBase } from '../base/token.service';
import { LocalAdministeredMacService } from '../../device/mac/lam.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class TokenByLamService extends TokenServiceBase {

  constructor(
    protected http: Http,
    private localAdministeredMacService: LocalAdministeredMacService
  ) {
    super(http);
  }

  getTokenByLam(): Observable<string> {
    let deviceKey = this.localAdministeredMacService.getNextMac();
    let checksum = this.mkChecksum(deviceKey);

    return this.http
      .post('pss:/UserService/DeviceLogin6' +
        '?deviceKey=' + encodeURIComponent(deviceKey) +
        '&isJailBroken=false' +
        '&checksum=' + encodeURIComponent(checksum) +
        '&deviceType=' + encodeURIComponent(TokenServiceBase.DEVICE_TYPE) +
        '&advertisingKey=' + encodeURIComponent(TokenServiceBase.WAIVE_ADVERTISING_KEY), {})
      .map(res => xml.parse(res.text()))
      .map(res => res['UserLogin']['accessToken']);
  }

  // FIXME: This needs to cache the generated mac and account otherwise the API server will start
  // to decline any requests from this client for 24hrs.

}
