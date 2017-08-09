import { Component, Input, HostBinding, OnInit } from '@angular/core';

import { Ship } from '../../../../../model/ship/ship.model';

@Component({
  selector: 'small-ship-preview',
  templateUrl: './small-ship-preview.component.html',
  styleUrls: ['./small-ship-preview.component.scss']
})
export class SmallShipPreviewComponent implements OnInit {
  @Input() ship: Ship;

  constructor() { }

  ngOnInit() {
  }

  @HostBinding('style.width')
  get renderWidth(): string {
    return this.ship.Design.SmallShipSprite.Width.toString() + 'px';
  }

  @HostBinding('style.height')
  get renderHeight(): string {
    return this.ship.Design.SmallShipSprite.Height.toString() + 'px';
  }

  @HostBinding('style.backgroundImage')
  get renderBackgroundImage(): string {
    return 'url("' + this.ship.Design.SmallShipSprite.File.fullPath + '")';
  }

  @HostBinding('style.backgroundPosition')
  get renderBackgroundPosition(): string {
    let xPart = '-' + this.ship.Design.SmallShipSprite.X.toString() + 'px';
    let yPart = '-' + this.ship.Design.SmallShipSprite.Y.toString() + 'px';
    return [xPart, yPart].join(' ');
  }

}
