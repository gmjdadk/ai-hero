import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs/Observable';

import { StaticFile } from '../../../model/model.module';
import { PersistentHttpService, XMLSerializerService } from '../../http/http-service.module';

@Injectable()
export class FileService {
  // Data services can be cached as they only change between patches
  private files: Observable<StaticFile[]>;
  private filesMap: Observable<Map<number, StaticFile>>;

  constructor(
    private http: PersistentHttpService,
    private xmlSerializerService: XMLSerializerService
  ) { }

  preloadCommons(): Observable<{}> {
    return this.getFilesMap().flatMap(_ => Observable.empty());
  }

  getFiles(): Observable<StaticFile[]> {
    return this.files
      ? this.files
      : this.files = this.http
        .get('x-cache:43200,[pss:/FileService/ListFiles2?deviceType=DeviceTypeiPhone]', {})
        .map(res => this.xmlSerializerService.unserialise(res.text()))
        .map(res => res['ListFiles']['Files']['File'])
        .map(res => plainToClass(StaticFile, res as Object[]))
        .publishReplay(1)
        .refCount();
  }

  getFilesMap(): Observable<Map<number, StaticFile>> {
    return this.filesMap
      ? this.filesMap
      : this.filesMap = this.getFiles()
        .map(res => new Map(res.map(v => [v.Id, v] as [number, StaticFile])))
        .publishReplay(1)
        .refCount();
  }

  getFileById(id: number): Observable<{ exists: boolean, file?: StaticFile }> {
    return this.getFilesMap()
      .map(res => res.get(id))
      .map(res => ({ exists: res !== undefined, file: res }));
  }
}
