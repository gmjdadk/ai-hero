import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Top100RouteComponent } from './top100.component';
import { PSSRTop100RoutingModule } from './top100-routing.module';
import { PSSRRenderComponentModule } from '../../component/render/render.module';

@NgModule({
  imports: [
      CommonModule,
      PSSRTop100RoutingModule,
      PSSRRenderComponentModule
    ],
  declarations: [Top100RouteComponent],
  exports: [Top100RouteComponent]
})
export class PSSRTop100Module { }
