import { Injectable } from '@angular/core';
import { XHRBackend, Request, XHRConnection, Response } from '@angular/http';
import { BrowserXhr, ResponseOptions, RequestOptions, XSRFStrategy } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PixelStarshipsAPIInterceptorBackend extends XHRBackend {
  static readonly API_CHECK_PROD_ENDPOINT = 'https://api.pixelstarships.com/SettingService/GetProductionServer';
  static readonly API_USER_AGENT = 'Pixel%20Starships/56 CFNetwork/811.5.4 Darwin/16.6.0 (x86_64)';

  private productionEndpoint: Observable<string>;

  constructor(
    private baseRequestOptions: RequestOptions,
    _browserXHR?: BrowserXhr,
    _baseResponseOptions?: ResponseOptions,
    _xsrfStrategy?: XSRFStrategy
  ) {
    super(_browserXHR, _baseResponseOptions, _xsrfStrategy);
  }

  getProductionEndpoint(): Observable<string> {
    const request = new Request({
      ... this.baseRequestOptions,
      url: PixelStarshipsAPIInterceptorBackend.API_CHECK_PROD_ENDPOINT
    });
    return this.productionEndpoint
      ? this.productionEndpoint
      : this.productionEndpoint = super.createConnection(
        new Request({
          ... this.baseRequestOptions,
          url: PixelStarshipsAPIInterceptorBackend.API_CHECK_PROD_ENDPOINT
        })
      ).response
      .map(res => res.text())
      .map(host => ['https://', host, '/'].join(''))
      .publishReplay(1)
      .refCount();
  }

  createConnection(req: Request): XHRConnection {
    // Create downstream connection
    const connection = super.createConnection(req);
    // Hook connection response and substitute the request before it's dispatched
    connection.response = this.getProductionEndpoint()
      .do(endpoint => {
        // Look for requests to the meta-protocol pss://
        const urlComponent = /^pss:\/?(.*)$/.exec(req.url);
        if (urlComponent !== null && urlComponent.length >= 2) {
          // Add custom headers - but server doesn't support CORS
          // req.headers.set('User-Agent', API_USER_AGENT);
          // Add current API base url
          req.url = endpoint + urlComponent[1];
          console.log(req.url);
        }
      })
      /* rxjs/pull/2691 */
      .flatMap(_ => Observable.empty<Response>())
      .ignoreElements()
      .concat(connection.response);

    return connection;
  }
}
