import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { SearchAllRouteComponent } from './search-all.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'all', component: SearchAllRouteComponent }
    ]),
    Angulartics2Module.forChild()
  ],
  exports: [RouterModule]
})
export class PSSRSearchAllRoutingModule { }
