import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterAllComponent } from './filter-all.component';
import { FilterAllRoutingModule } from './filter-all-routing.module';

@NgModule({
  imports: [CommonModule, FilterAllRoutingModule],
  declarations: [FilterAllComponent],
  exports: [FilterAllComponent]
})
export class SeerFilterAllModule { }