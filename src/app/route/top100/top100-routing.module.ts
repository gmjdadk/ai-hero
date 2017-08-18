import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Top100RouteComponent } from './top100.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: '/top100', pathMatch: 'full' },
      { path: 'top100', component: Top100RouteComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PSSRTop100RoutingModule { }
