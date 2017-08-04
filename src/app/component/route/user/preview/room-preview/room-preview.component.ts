import { Input, HostBinding, Component, OnInit } from '@angular/core';

import { Room } from '../../../../../model/ship/room.model';
import { LayoutService } from '../../../../../service/preview/layout/layout.service';

@Component({
  selector: 'room-preview',
  templateUrl: './room-preview.component.html',
  styleUrls: ['./room-preview.component.css']
})
export class RoomPreviewComponent implements OnInit {
  @Input() room: Room;

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
  }

  @HostBinding('style.left')
  get renderLeft(): string {
    return this.layoutService.columnsToUnits(this.room.Column);
  }

  @HostBinding('style.top')
  get renderTop(): string {
    return this.layoutService.rowsToUnits(this.room.Row)
  }

  @HostBinding('style.width')
  get renderWidth(): string {
    return this.layoutService.columnsToUnits(this.room.Design.Columns);
  }

  @HostBinding('style.height')
  get renderHeight(): string {
    return this.layoutService.rowsToUnits(this.room.Design.Rows);
  }

  @HostBinding('style.backgroundImage')
  get renderBackgroundImage(): string {
    return 'url(' + this.room.Design.Sprite.File.fullPath + ')';
  }

  @HostBinding('style.backgroundPosition')
  get renderBackgroundPosition(): string {
    let xPart = this.room.Design.Sprite.X.toString() + 'px';
    let yPart = this.room.Design.Sprite.Y.toString() + 'px';
    return [xPart, yPart].join(' ');
  }
}
