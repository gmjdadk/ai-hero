import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRouteComponent } from './not-found.component';
import { PSSRPageNotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [
    CommonModule,
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
