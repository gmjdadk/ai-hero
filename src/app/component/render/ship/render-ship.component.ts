import { Input, ElementRef, HostBinding, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Room, Ship } from '../../../model/model.module';
import { GridToPxService } from '../../../service/render/render-service.module';
import { RoomByShipService } from '../../../service/ship/ship-service.module';

@Component({
  selector: 'pssr-render-ship',
  templateUrl: './render-ship.component.html',
  styleUrls: ['./render-ship.component.scss']
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

  get viewBoxOfShip(): string {
    const components = [
      0,
      0,
      this.gridToPxService.columnsToUnits(this.ship.Design.Columns).toString(),
      this.gridToPxService.rowsToUnits(this.ship.Design.Rows).toString()
    ];
    return components.join(' ');
  }

  @HostBinding('style.maxWidth')
  get maxWidthOfShip(): string {
    return this.gridToPxService.columnsToPx(this.ship.Design.Columns);
  }
}
