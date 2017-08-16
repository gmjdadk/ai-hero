import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeerCommonComponentsModule } from '../common/common.module';
import { FilterTop100Component } from './filter-top100.component';
import { FilterTop100RoutingModule } from './filter-top100-routing.module';

@NgModule({
  imports: [
      CommonModule,
      SeerCommonComponentsModule,
      FilterTop100RoutingModule
    ],
  declarations: [FilterTop100Component],
  exports: [FilterTop100Component]
})
export class SeerFilterTop100Module { }