import { Type } from 'class-transformer';

const AWS_BASE_PATH = '//pixelstarships.s3.amazonaws.com/';

export class StaticFile {
  @Type(() => Number) Id: number;
  @Type(() => String) Filename: string;
  @Type(() => Date) DateUpdated: Date;
  @Type(() => String) FileDownloadCategory: string;
  @Type(() => String) AwsFilename: string;

  get fullPath() {
    return AWS_BASE_PATH + this.AwsFilename;
  }
}