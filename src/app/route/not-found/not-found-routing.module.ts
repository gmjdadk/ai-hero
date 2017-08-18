import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundRouteComponent } from './not-found.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '..', component: NotFoundRouteComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PSSRPageNotFoundRoutingModule { }
