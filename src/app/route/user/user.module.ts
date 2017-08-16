import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSpinKitModule } from 'ng-spin-kit';
import { UserComponent } from './user.component';
import { SeerCommonComponentsModule } from '../common/common.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgSpinKitModule,
    SeerCommonComponentsModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ]
})
export class SeerUserModule { }