import { Component, Input, HostBinding } from '@angular/core';

import { Ship } from '../../../model/model.module';

@Component({
  selector: 'pssr-render-small-ship',
  templateUrl: './render-small-ship.component.html',
  styleUrls: ['./render-small-ship.component.scss']
})
export class RenderSmallShipComponent {
  @Input() ship: Ship;

  constructor() { }

  get renderWidth(): string {
    return this.ship.Design.SmallShipSprite.Width.toString() + 'px';
  }

  get renderHeight(): string {
    return this.ship.Design.SmallShipSprite.Height.toString() + 'px';
  }

  get renderBackgroundImage(): string {
    return 'url("' + this.ship.Design.SmallShipSprite.File.fullPath + '")';
  }

  get renderBackgroundPosition(): string {
    const xPart = '-' + this.ship.Design.SmallShipSprite.X.toString() + 'px';
    const yPart = '-' + this.ship.Design.SmallShipSprite.Y.toString() + 'px';
    return [xPart, yPart].join(' ');
  }

}
