import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { UserRouteComponent } from './user.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'user/:id', component: UserRouteComponent }
    ]),
    Angulartics2Module.forChild()
  ],
  exports: [RouterModule]
})
export class PSSRUserRoutingModule { }
