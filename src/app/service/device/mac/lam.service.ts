import { Injectable } from '@angular/core';

@Injectable()
export class LocalAdministeredMacService {

  constructor() { }

  getNextMac() {
    return "xoxxxxxxxxxx"
      .replace(/x/g, () => "0123456789abcdef".charAt(Math.floor(Math.random() * 16)))
      // https://serverfault.com/questions/40712/what-range-of-mac-addresses-can-i-safely-use-for-my-virtual-machines
      .replace(/o/g, () => "26ae".charAt(Math.floor(Math.random() * 4)));
  }

}
