import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListTemplateComponent, CardListItemTemplateComponent } from './card-list/card-list.component';
import { NavItemTemplateComponent } from './nav-item/nav-item.component';
import { SearchTemplateComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardListTemplateComponent,
    CardListItemTemplateComponent,
    NavItemTemplateComponent,
    SearchTemplateComponent
  ],
  exports: [
    CardListTemplateComponent,
    CardListItemTemplateComponent,
    NavItemTemplateComponent,
    SearchTemplateComponent
  ]
})
export class PSSRControlTemplateComponentModule { }
