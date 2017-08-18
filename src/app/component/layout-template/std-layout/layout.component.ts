import { Component, OnInit } from '@angular/core';

export * from './header/header.component';
export * from './content/content.component';
export * from './footer/footer.component';

@Component({
  selector: 'pssr-std-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
