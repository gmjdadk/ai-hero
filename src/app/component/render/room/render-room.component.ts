import { Input, HostBinding, Component, OnInit } from '@angular/core';

import { Room } from '../../../model/model.module';
import { GridToPxService } from '../../../service/render/render-service.module';

@Component({
  selector: 'g[pssr-svg-render-room]',
  templateUrl: './render-room.component.html',
  styleUrls: ['./render-room.component.scss']
})
export class RenderRoomComponent implements OnInit {
  @Input() room: Room;

  public image: HTMLImageElement;

  constructor(
    private gridToPxService: GridToPxService
  ) { }

  ngOnInit() {
    this.image = new Image();
    this.image.src = this.room.Design.Sprite.File.fullPath;
  }

  get viewBoxOfRoom(): string {
    const components = [
      '0',
      '0',
      this.room.Design.Sprite.Width.toString(),
      this.room.Design.Sprite.Height.toString()
    ];
    return components.join(' ');
  }
}
