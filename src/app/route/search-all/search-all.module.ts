import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Angulartics2Module } from 'angulartics2';
import { SearchAllRouteComponent } from './search-all.component';
import { PSSRSearchAllRoutingModule } from './search-all-routing.module';
import { PSSRRenderComponentModule } from '../../component/render/render.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      Angulartics2Module.forChild(),
      PSSRSearchAllRoutingModule,
      PSSRRenderComponentModule
    ],
  declarations: [SearchAllRouteComponent],
  exports: [SearchAllRouteComponent]
})
export class PSSRSearchAllModule { }
