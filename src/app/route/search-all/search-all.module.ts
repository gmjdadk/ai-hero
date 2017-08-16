import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeerCommonComponentsModule } from '../common/common.module';
import { FilterAllComponent } from './filter-all.component';
import { FilterAllRoutingModule } from './filter-all-routing.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      SeerCommonComponentsModule,
      FilterAllRoutingModule
    ],
  declarations: [FilterAllComponent],
  exports: [FilterAllComponent]
})
export class SeerFilterAllModule { }