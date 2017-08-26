import { NgModule } from '@angular/core';

import { CharacterDesign } from './data/character-design/character-design.model';
import { RoomDesign } from './data/room-design/room-design.model';
import { ShipDesign } from './data/ship-design/ship-design.model';
import { StaticFile } from './data/static-file/static-file.model';
import { StaticSprite } from './data/static-sprite/static-sprite.model';
import { VersionInfo } from './data/version-info/version-info.model';

import { Crew } from './ship/crew/crew.model';
import { Room } from './ship/room/room.model';
import { Ship } from './ship/ship/ship.model';

import { User } from './user/user/user.model';
import { UserBrief } from './user/user-brief/user-brief.model';

export { CharacterDesign, RoomDesign, ShipDesign, StaticFile, StaticSprite, VersionInfo };
export { Crew, Room, Ship };
export { User, UserBrief };

@NgModule({})
export class PSSRModelsModule { }
