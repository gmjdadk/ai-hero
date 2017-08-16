import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterTop100Component } from './filter-top100.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'top100', component: FilterTop100Component }
    ])
  ],
  exports: [RouterModule]
})
export class FilterTop100RoutingModule { }