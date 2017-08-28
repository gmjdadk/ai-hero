import { Component, OnInit } from '@angular/core';

export { CardListItemTemplateComponent } from './card-list-item/card-list-item.component';

@Component({
  selector: 'ul[pssr-ul-card-list]',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
