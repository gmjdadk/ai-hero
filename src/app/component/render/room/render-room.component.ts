import { Input, HostBinding, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Room } from '../../../model/model.module';
import { GridToPxService } from '../../../service/render/render-service.module';

@Component({
  selector: 'g[pssr-svg-render-room]',
  templateUrl: './render-room.component.html',
  styleUrls: ['./render-room.component.scss']
})
export class RenderRoomComponent implements OnInit {
  public spriteSheetWidth$: Observable<number>;
  public spriteSheetHeight$: Observable<number>;

  private roomSubject: BehaviorSubject<Room> = new BehaviorSubject<Room>(null);

  constructor(
    private gridToPxService: GridToPxService
  ) { }

  ngOnInit() {
    // SVG1 does not support automatically assigning the target image dimensions,
    //   so we need to fetch the image and then pipe its dimensions into the <svg:image> element directly.
    const imageDims$: Observable<{width, height}> = this.roomSubject
      .switchMap(room => {
        return Observable.create(observer => {
          const image = new Image();
          image.src = room.Design.Sprite.File.fullPath;

          image.onload = _ => {
            observer.next({width: image.naturalWidth, height: image.naturalHeight});
            observer.complete();
          };
          image.onerror = err => {
            observer.error(err);
          };
        });
      });

    this.spriteSheetWidth$ = imageDims$.map(x => x.width);
    this.spriteSheetHeight$ = imageDims$.map(x => x.height);
  }

  @Input()
  set room(room: Room) {
    this.roomSubject.next(room);
  }

  get room(): Room {
    return this.roomSubject.getValue();
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
