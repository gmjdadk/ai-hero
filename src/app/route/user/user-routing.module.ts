import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteComponent } from './user.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'user/:id', component: UserRouteComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PSSRUserRoutingModule { }
