import { Injectable } from '@angular/core';

const PX_PER_COLUMN = 25;
const PX_PER_ROW = 25;
const SCALE_FACTOR = 0.7;

@Injectable()
export class LayoutService {

  constructor() { }

  columnsToUnits(cols: number): string {
    let colsAsPx = cols * PX_PER_COLUMN;
    return colsAsPx.toString() + 'px';
  }

  rowsToUnits(rows: number): string {
    let rowsAsPx = rows * PX_PER_ROW;
    return rowsAsPx.toString() + 'px';
  }
}
