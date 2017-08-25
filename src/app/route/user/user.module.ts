import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSpinKitModule } from 'ng-spin-kit';
import { UserRouteComponent } from './user.component';
import { PSSRUserRoutingModule } from './user-routing.module';
import { PSSRRenderComponentModule } from '../../component/render/render.module';

@NgModule({
  imports: [
    CommonModule,
    NgSpinKitModule,
    PSSRUserRoutingModule,
    PSSRRenderComponentModule
  ],
  declarations: [
    UserRouteComponent
  ],
  exports: [
    UserRouteComponent
  ]
})
export class PSSRUserModule { }
