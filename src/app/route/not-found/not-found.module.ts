import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRouteComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ],
  declarations: [
    NotFoundRouteComponent
  ],
  exports: [
    NotFoundRouteComponent
  ]
})
export class SeerUserModule { }