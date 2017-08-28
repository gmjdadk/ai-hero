import { Component, OnInit, ElementRef } from '@angular/core';

import * as Headspace from 'headspace';

@Component({
  selector: 'pssr-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit() {
    Headspace(this.element.nativeElement, {
      startOffset: 80,
      classNames: {
        base: 'header',
        fixed: 'header--fixed',
        hidden: 'header--hidden'
      }
    });
  }

}
