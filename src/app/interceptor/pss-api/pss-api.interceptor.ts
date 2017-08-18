import { XHRBackend, Request, XHRConnection, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const API_BASE_URL = 'https://api.pixelstarships.com/';
const API_USER_AGENT = 'Pixel%20Starships/56 CFNetwork/811.5.4 Darwin/16.6.0 (x86_64)';

export class PixelStarshipsAPIInterceptorBackend extends XHRBackend {

  createConnection(req: Request): XHRConnection {
    // Look for requests to the meta-protocol pss://
    const urlComponent = /^pss:\/?(.*)$/.exec(req.url);
    if (urlComponent !== null && urlComponent.length >= 2) {
      // Add custom headers - but server doesn't support CORS
      // req.headers.set('User-Agent', API_USER_AGENT);
      // Add current API base url
      req.url = API_BASE_URL + urlComponent[1];
    }
    return super.createConnection(req);
  }
}
