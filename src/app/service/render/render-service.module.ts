import { NgModule } from '@angular/core';

import { GridServiceBase } from './grid/base/grid.service';
import { GridToPxService, ColumnsToPxPipe, RowsToPxPipe } from './grid/to-px/grid-to-px.service';

export { GridServiceBase, GridToPxService };

@NgModule({
  declarations: [
    GridServiceBase,
    GridToPxService,
    RowsToPxPipe,
    ColumnsToPxPipe
  ],
  providers: [
    GridServiceBase,
    GridToPxService
  ],
  exports: [
    RowsToPxPipe,
    ColumnsToPxPipe
  ]
})
export class PSSRRenderServiceModule { }
