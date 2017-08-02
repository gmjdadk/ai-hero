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
    return this.localAdministeredMacService.getAssignedLam().flatMap(deviceKey => {
        // Checksum is required to validate DeviceLogin request integrity.
        let checksum = this.mkChecksum(deviceKey);
        console.info('LocalAdministeredMac:', deviceKey);

        // Because the LAM is cached, the account is also cached and hence the token always points to same account.
        // This is because if you create too many accounts within 24-hr you get blocked from the APIs.
        return this.http
          .post('pss:/UserService/DeviceLogin6' +
            '?deviceKey=' + encodeURIComponent(deviceKey) +
            '&isJailBroken=false' +
            '&checksum=' + encodeURIComponent(checksum) +
            '&deviceType=' + encodeURIComponent(TokenServiceBase.DEVICE_TYPE) +
            '&advertisingKey=' + encodeURIComponent(TokenServiceBase.WAIVE_ADVERTISING_KEY), '')
            // ^ use body '' instead of {} to get correct content type and waive CORS
          .map(res => xml.parse(res.text()))
          .map(res => res['UserLogin']['accessToken']);
      })
      .publishReplay(1)
      .refCount();
  }

}
