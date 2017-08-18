import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchAllRouteComponent } from './search-all.component';
import { PSSRSearchAllRoutingModule } from './search-all-routing.module';
import { PSSRRenderComponentModule } from '../../component/render/render.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      PSSRSearchAllRoutingModule,
      PSSRRenderComponentModule
    ],
  declarations: [SearchAllRouteComponent],
  exports: [SearchAllRouteComponent]
})
export class PSSRSearchAllModule { }
