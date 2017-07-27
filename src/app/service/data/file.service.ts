import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Type, plainToClass } from 'class-transformer';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

const AWS_BASE_PATH = '//pixelstarships.s3.amazonaws.com/';

export class File {
  @Type(() => Number) Id: number;
  @Type(() => String) Filename: string;
  @Type(() => Date) DateUpdated: Date;
  @Type(() => String) FileDownloadCategory: string;
  @Type(() => String) AwsFilename: string;

  get fullPath() {
    return AWS_BASE_PATH + this.AwsFilename;
  }
}

@Injectable()
export class FileService {
  // Data services can be cached as they only change between patches
  private files: Observable<File[]>;
  private filesMap: Observable<Map<number, File>>;

  constructor(private http: Http) { }

  getFiles(): Observable<File[]> {
    return this.files
      ? this.files
      : this.files = this.http
        .get('pss:/FileService/ListFiles2?deviceType=DeviceTypeiPhone', {})
        .map(res => xml.parse(res.text()))
        .map(res => res['ListFiles']['Files']['File'])
        .map(res => plainToClass(File, res as Object[]))
        .publishReplay(1)
        .refCount();
  }

  getFilesMap(): Observable<Map<number, File>> {
    return this.filesMap
      ? this.filesMap
      : this.filesMap = this.getFiles()
        .map(res => new Map(res.map(v => [v.Id, v] as [number, File])))
        .publishReplay(1)
        .refCount();
  }

  getFileById(id: number): Observable<{ exists: boolean, file?: File }> {
    return this.getFilesMap()
      .map(res => res.get(id))
      .map(res => { return { exists: res !== undefined, file: res } });
  }
}