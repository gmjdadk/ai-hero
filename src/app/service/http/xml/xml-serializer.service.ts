import { Injectable } from '@angular/core';

import * as xml from 'pixl-xml';

@Injectable()
export class XMLSerializerService {

  constructor () { }

  asArray<T>(input: T|T[]): T[] {
    return xml.alwaysArray(input);
  }

  unserialise(response: string): any {
    return xml.parse(response);
  }

  serialize(object: any): string {
    // FIXME: serialize not implemented
    throw Error("not implemented");
  }

}