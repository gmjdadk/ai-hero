import { Input, ElementRef, HostBinding, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Room, Ship } from '../../../model/model.module';
import { GridToPxService } from '../../../service/render/render-service.module';
import { RoomByShipService } from '../../../service/ship/ship-service.module';

/* The maximum width of a ship before it should be downscaled */
const MAXIMUM_SHIP_WIDTH = 1000;
/* The maximum height of a ship before it should be downscaled */
const MAXIMUM_SHIP_HEIGHT = 700;

@Component({
  selector: 'pssr-render-ship',
  templateUrl: './render-ship.component.html',
  styleUrls: ['./render-ship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderShipComponent implements OnInit {
  public rooms$: Observable<Room[]>;

  private inspectShipSubject: BehaviorSubject<Ship> = new BehaviorSubject<Ship>(null);

  constructor(
    private gridToPxService: GridToPxService,
    private roomByShipService: RoomByShipService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.rooms$ = this.inspectShipSubject
      .switchMap(ship => this.roomByShipService.getRoomsByShip(ship));
  }

  @Input()
  set ship(ship: Ship) {
    this.inspectShipSubject.next(ship);
  }

  get ship(): Ship {
    return this.inspectShipSubject.getValue();
  }

  get zoomScale(): number {
    const width = this.gridToPxService.columnsToUnits(this.ship.Design.Columns);
    const height = this.gridToPxService.rowsToUnits(this.ship.Design.Rows);
    return Math.min(MAXIMUM_SHIP_WIDTH / width, MAXIMUM_SHIP_HEIGHT / height, 1);
  }

  @HostBinding('style.transform')
  get renderZoom(): string {
    return 'scale(' + this.zoomScale.toString() + ')';
  }

  @HostBinding('style.margin')
  get renderMargin(): string {
    const yMargin = 0.5 * (1 - this.zoomScale) * -this.gridToPxService.rowsToUnits(this.ship.Design.Rows);
    const yPart = yMargin.toString() + 'px';
    return [yPart, 'auto'].join(' ');
  }

  @HostBinding('style.width')
  get renderWidth(): string {
    return this.gridToPxService.columnsToPx(this.ship.Design.Columns);
  }

  @HostBinding('style.height')
  get renderHeight(): string {
    return this.gridToPxService.rowsToPx(this.ship.Design.Rows);
  }

  @HostBinding('style.backgroundImage')
  get renderBackgroundImage(): string {
    return 'url("' + this.ship.Design.BackgroundSprite.File.fullPath + '")';
  }
}
