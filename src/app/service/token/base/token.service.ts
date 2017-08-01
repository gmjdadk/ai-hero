import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as md5 from 'md5';

@Injectable()
export abstract class TokenServiceBase {
  static DEVICE_TYPE = "DeviceTypeMac";
  static MD5_CHECKSUM_SALT = "savysoda";
  static WAIVE_ADVERTISING_KEY = "\"\"";

  constructor(
    protected http: Http
  ) { }

  protected mkChecksum(deviceKey: string) {
    return md5(deviceKey + TokenServiceBase.DEVICE_TYPE + TokenServiceBase.MD5_CHECKSUM_SALT);
  }

}
