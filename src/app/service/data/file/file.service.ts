import { Injectable } from '@angular/core';
import { PersistentHttpService } from '../../http/persistent/persistent-http.service';
import { Type, plainToClass } from 'class-transformer';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

import { StaticFile } from '../../../model/data/static-file.model';

@Injectable()
export class FileService {
  // Data services can be cached as they only change between patches
  private files: Observable<StaticFile[]>;
  private filesMap: Observable<Map<number, StaticFile>>;

  constructor(private http: PersistentHttpService) { }

  preloadCommons(): Observable<{}> {
    return this.getFilesMap().flatMap(_ => Observable.empty());
  }

  getFiles(): Observable<StaticFile[]> {
    return this.files
      ? this.files
      : this.files = this.http
        .get('x-cache:43200,[pss:/FileService/ListFiles2?deviceType=DeviceTypeiPhone]', {})
        .map(res => xml.parse(res.text()))
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
      .map(res => { return { exists: res !== undefined, file: res } });
  }
}