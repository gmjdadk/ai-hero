import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTop100Component } from './filter-top100.component';
import { FilterTop100RoutingModule } from './filter-top100-routing.module';

@NgModule({
  imports: [CommonModule, FilterTop100RoutingModule],
  declarations: [FilterTop100Component],
  exports: [FilterTop100Component]
})
export class SeerFilterTop100Module { }