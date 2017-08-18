import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchAllRouteComponent } from './search-all.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'all', component: SearchAllRouteComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PSSRSearchAllRoutingModule { }
