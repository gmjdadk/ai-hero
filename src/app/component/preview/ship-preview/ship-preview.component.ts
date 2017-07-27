import { Input, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Room, RoomService } from '../../../service/ship/room.service';
import { LayoutService } from '../../../service/preview/layout.service';

@Component({
  selector: 'ship-preview',
  templateUrl: './ship-preview.component.html',
  styleUrls: ['./ship-preview.component.css'],
  providers: [
    LayoutService
  ]
})
export class ShipPreviewComponent implements OnInit {
  @Input() rooms: Room[];

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

}
