import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Top100RouteComponent } from './top100.component';
import { PSSRTop100RoutingModule } from './top100-routing.module';
import { PSSRRenderComponentModule } from '../../component/render/render.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      PSSRTop100RoutingModule,
      PSSRRenderComponentModule
    ],
  declarations: [Top100RouteComponent],
  exports: [Top100RouteComponent]
})
export class PSSRTop100Module { }
