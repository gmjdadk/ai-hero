import { NgModule } from '@angular/core';

import { CharacterDesignService } from './character-design/character-design.service';
import { FileService } from './file/file.service';
import { RoomDesignService } from './room-design/room-design.service';
import { ShipDesignService } from './ship-design/ship-design.service';
import { SpriteService } from './sprite/sprite.service';

export { CharacterDesignService, FileService, RoomDesignService, ShipDesignService, SpriteService };

@NgModule({
  providers: [
    CharacterDesignService,
    FileService,
    RoomDesignService,
    ShipDesignService,
    SpriteService
  ],
})
export class PSSRDataServiceModule { }
