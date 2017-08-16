import { Injectable } from '@angular/core';

const PX_PER_COLUMN = 25;
const PX_PER_ROW = 25;

const SCALE_FACTOR = 1; /* Not in use */

@Injectable()
export class GridServiceBase {

  constructor() { }

  columnsToUnits(cols: number): number {
    return cols * PX_PER_COLUMN * SCALE_FACTOR;
  }

  rowsToUnits(rows: number): number {
    return rows * PX_PER_ROW * SCALE_FACTOR;
  }
}
