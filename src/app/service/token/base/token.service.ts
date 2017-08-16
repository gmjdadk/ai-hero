import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as md5 from 'md5';

export abstract class TokenServiceBase {
  /* These will probably be common among child providers */
  protected static DEVICE_TYPE = "DeviceTypeMac";
  protected static MD5_CHECKSUM_SALT = "savysoda";
  protected static WAIVE_ADVERTISING_KEY = "\"\"";

  constructor(
    protected http: Http
  ) { }

  protected mkChecksum(deviceKey: string) {
    return md5(deviceKey + TokenServiceBase.DEVICE_TYPE + TokenServiceBase.MD5_CHECKSUM_SALT);
  }

}
