import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { NotFoundRouteComponent } from './not-found.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '..', component: NotFoundRouteComponent }
    ]),
    Angulartics2Module.forChild()
  ],
  exports: [RouterModule]
})
export class PSSRPageNotFoundRoutingModule { }
