import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angulartics2Module } from 'angulartics2';
import { NotFoundRouteComponent } from './not-found.component';
import { PSSRPageNotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Angulartics2Module.forChild(),
    PSSRPageNotFoundRoutingModule
  ],
  declarations: [
    NotFoundRouteComponent
  ],
  exports: [
    NotFoundRouteComponent
  ]
})
export class PSSRPageNotFoundModule { }
