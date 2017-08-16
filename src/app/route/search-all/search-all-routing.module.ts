import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterAllComponent } from './filter-all.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: '/all', pathMatch: 'full' },
      { path: 'all', component: FilterAllComponent }
    ])
  ],
  exports: [RouterModule]
})
export class FilterAllRoutingModule { }