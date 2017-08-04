import { Input, ElementRef, HostBinding, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Room } from '../../../../../model/ship/room.model';
import { Ship } from '../../../../../model/ship/ship.model';

import { RoomByShipService } from '../../../../../service/ship/room/by-ship/room-by-ship.service';
import { LayoutService } from '../../../../../service/preview/layout/layout.service';

@Component({
  selector: 'ship-preview',
  templateUrl: './ship-preview.component.html',
  styleUrls: ['./ship-preview.component.css'],
  providers: [
    LayoutService
  ]
})
export class ShipPreviewComponent implements OnInit {
  private _ship: Ship;
  private rooms: Room[];

  constructor(
    private layoutService: LayoutService,
    private roomByShipService: RoomByShipService,
    private element: ElementRef
  ) { }

  @Input()
  set ship(ship: Ship) {
    this._ship = ship;
    // Reload rooms on binding change
    this.roomByShipService.getRoomsByShip(this._ship).subscribe(res => this.rooms = res);
  }

  get ship() {
    return this._ship;
  }

  ngOnInit() {
  }

  @HostBinding('style.transform')
  get renderZoom(): string {
    
    //let rect = this.element.nativeElement.getBoundingClientRect();
    let parentRect = this.element.nativeElement.parentElement.getBoundingClientRect();
    let width = parseInt(this.layoutService.columnsToUnits(this.ship.Design.Columns).slice(0, -2));
    let height = parseInt(this.layoutService.rowsToUnits(this.ship.Design.Rows).slice(0, -2));
    return 'scale(' + Math.min(parentRect.width / width, 700 / height, 1).toString() + ')';
  }

  @HostBinding('style.width')
  get renderWidth(): string {
    return this.layoutService.columnsToUnits(this.ship.Design.Columns);
  }

  @HostBinding('style.height')
  get renderHeight(): string {
    return this.layoutService.rowsToUnits(this.ship.Design.Rows);
  }

  @HostBinding('style.backgroundImage')
  get renderBackgroundImage(): string {
    return 'url("' + this.ship.Design.BackgroundSprite.File.fullPath + '")';
  }
}
