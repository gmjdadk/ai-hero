import { XHRBackend, Request, XHRConnection, Response } from '@angular/http';

import { Observable } from 'rxjs';

const API_BASE_URL: string = 'http://api.pixelstarships.com/';
const API_USER_AGENT: string = 'Pixel%20Starships/56 CFNetwork/811.5.4 Darwin/16.6.0 (x86_64)';
  
export class PixelStarshipsAPIInterceptorBackend extends XHRBackend {

  createConnection(req: Request): XHRConnection {
    // Look for requests to the meta-protocol pss://
    let urlComponent = /^pss:\/?(.*)$/.exec(req.url);
    if (urlComponent !== null && urlComponent.length >= 2) {
      // Add custom headers
      // FIXME: Adding client emulation header triggers CORS, server doesn't support
      // req.headers.set('User-Agent', API_USER_AGENT);
      // Add current API base url
      req.url = API_BASE_URL + urlComponent[1];
      // Patch angular to not send pre-flight
      req.headers.set('Accept', '*/*');
      req.headers.set('Content-Type', 'text/plain');
    }
    return super.createConnection(req);
  }
}