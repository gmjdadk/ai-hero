import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseOptions, ResponseOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PersistenceService, StorageType } from 'angular-persistence';

const DEFAULT_CACHE_TIME = 12 * 60 * 60 * Math.pow(10, 3); // 12 hrs

@Injectable()
export class PersistentHttpService extends Http {

  constructor (
    backend: XHRBackend,
    options: RequestOptions,
    private persistenceService: PersistenceService,
    private baseResponseOptions?: ResponseOptions
  ) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    // Look for urls in the format x-cache:seconds,protocol://... to intercept
    // Don't attempt to cache otherwise
    let uri = typeof url === 'string' ? url : url.url;
    let uriComponents = /^x-cache:(\d+),(.*)$/.exec(uri);
    return !uriComponents || uriComponents.length < 3
      ? super.request(url, options)
      : this.persistenceService
        .createCache("http-cache::" + encodeURI(uriComponents[2]),
          // Response is broken up for storage
          () => super.request(uriComponents[2], options).map(
              req => { return {
                body: req.text(), status: req.status, headers: req.headers.toJSON(), statusText: req.statusText, type: req.type, url: req.url } }),
          { type: StorageType.LOCAL, expireAfter: parseInt(uriComponents[1]) * 1000 || DEFAULT_CACHE_TIME })
        .get()
        // ... and then put back together again
        .map(res => {
          let args: ResponseOptionsArgs = {
            body: res.body, status: res.status, headers: new Headers(res.headers), statusText: res.statusText, type: res.type, url: res.url };
          let respOptions = new ResponseOptions(args);
          if (this.baseResponseOptions != null) {
            respOptions = this.baseResponseOptions.merge(respOptions);
          }
          return new Response(respOptions);
        });
  }
}