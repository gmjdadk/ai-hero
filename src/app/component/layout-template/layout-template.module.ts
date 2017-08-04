import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutTemplateInterfaceDirective } from './layout-template-interface.directive';

import * as StdLayout from './std-layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    // Layout Interface
    LayoutTemplateInterfaceDirective,
    // Std Layout
    StdLayout.LayoutComponent,
    StdLayout.LayoutHeaderComponent,
    StdLayout.LayoutContentComponent,
    StdLayout.LayoutFooterComponent
  ],
  exports: [
    // Interfaces
    LayoutTemplateInterfaceDirective,
    // Layouts
    StdLayout.LayoutComponent
  ]
})
export class LayoutTemplateModule { }
