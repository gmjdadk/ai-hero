import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angulartics2Module } from 'angulartics2';
import { Top100RouteComponent } from './top100.component';
import { PSSRTop100RoutingModule } from './top100-routing.module';
import { PSSRRenderComponentModule } from '../../component/render/render.module';

@NgModule({
  imports: [
      CommonModule,
      Angulartics2Module.forChild(),
      PSSRTop100RoutingModule,
      PSSRRenderComponentModule
    ],
  declarations: [Top100RouteComponent],
  exports: [Top100RouteComponent]
})
export class PSSRTop100Module { }
