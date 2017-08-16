import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { GridServiceBase } from '../base/grid.service';

@Injectable()
export class GridToPxService extends GridServiceBase {

  constructor() {
    super();
  }

  columnsToPx(cols: number): string {
    return this.columnsToUnits(cols).toString() + 'px';
  }

  rowsToPx(rows: number): string {
    return this.rowsToUnits(rows).toString() + 'px';
  }
}

@Pipe({
	name: "cols2px",
  pure: true
})
export class ColumnsToPxPipe implements PipeTransform {

  constructor(private gridToPxService: GridToPxService) {}

	transform(value: number): string {
    return this.gridToPxService.columnsToPx(value);
	}
}

@Pipe({
	name: "rows2px",
  pure: true
})
export class RowsToPxPipe implements PipeTransform {

  constructor(private gridToPxService: GridToPxService) {}

	transform(value: number): string {
    return this.gridToPxService.rowsToPx(value);
	}
}
