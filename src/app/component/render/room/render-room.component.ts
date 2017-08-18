import { Input, HostBinding, Component } from '@angular/core';

import { Room } from '../../../model/model.module';
import { GridToPxService } from '../../../service/render/render-service.module';

@Component({
  selector: 'pssr-render-room',
  templateUrl: './render-room.component.html',
  styleUrls: ['./render-room.component.scss']
})
export class RenderRoomComponent {
  @Input() room: Room;

  constructor(
    private gridToPxService: GridToPxService
  ) { }

  @HostBinding('style.left')
  get renderLeft(): string {
    return this.gridToPxService.columnsToPx(this.room.Column);
  }

  @HostBinding('style.top')
  get renderTop(): string {
    return this.gridToPxService.rowsToPx(this.room.Row);
  }

  @HostBinding('style.width')
  get renderWidth(): string {
    return this.gridToPxService.columnsToPx(this.room.Design.Columns);
  }

  @HostBinding('style.height')
  get renderHeight(): string {
    return this.gridToPxService.rowsToPx(this.room.Design.Rows);
  }

  @HostBinding('style.backgroundImage')
  get renderBackgroundImage(): string {
    return 'url(' + this.room.Design.Sprite.File.fullPath + ')';
  }

  @HostBinding('style.backgroundPosition')
  get renderBackgroundPosition(): string {
    const xPart = '-' + this.room.Design.Sprite.X.toString() + 'px';
    const yPart = '-' + this.room.Design.Sprite.Y.toString() + 'px';
    return [xPart, yPart].join(' ');
  }
}
