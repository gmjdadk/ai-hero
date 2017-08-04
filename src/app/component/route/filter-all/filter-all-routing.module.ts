import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterAllComponent } from './filter-all.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: FilterAllComponent }
    ])
  ],
  exports: [RouterModule]
})
export class FilterAllRoutingModule { }