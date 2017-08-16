import { Type, Exclude } from 'class-transformer';
import { StaticSprite } from './static-sprite.model';

export class RoomDesign {
  @Type(() => Number) Capacity: number;
  @Type(() => String) CategoryType: string;
  @Type(() => Number) Columns: number;
  @Type(() => Number) ConstructionSpriteId: number;
  @Type(() => Number) ConstructionTime: number;
  @Type(() => Number) DefaultDefenceBonus: number;
  @Type(() => Boolean) FlipOnEnemyShip: Boolean;
  @Type(() => Number) GasCost: number;
  @Type(() => Number) ImageSpriteId: number;
  @Type(() => Number) ImprovementAmounts: number;
  @Type(() => Number) ItemRank: number;
  @Type(() => Number) Level: number;
  @Type(() => Number) LogoSpriteId: number;
  @Type(() => Number) ManufactureCapacity: number;
  @Type(() => Number) ManufactureRate: number;
  @Type(() => String) ManufactureType: string;
  @Type(() => Number) MaxPowerGenerated: number;
  @Type(() => Number) MaxSystemPower: number;
  @Type(() => Number) MinShipLevel: number;
  @Type(() => Number) MineralCost: number;
  @Type(() => Number) MissileDesignId: number;
  @Type(() => String) PriceString: string;
  @Type(() => Number) RaceId: number;
  @Type(() => Number) RandomImprovements: number;
  @Type(() => Number) RefillUnitCost: number;
  @Type(() => Number) ReloadTime: number;
  @Type(() => String) RoomDescription: string;
  @Type(() => Number) RoomDesignId: number;
  @Type(() => String) RoomName: string;
  @Type(() => String) RoomShortName: string;
  @Type(() => String) RoomType: string;
  @Type(() => Number) RootRoomDesignId: number;
  @Type(() => Boolean) Rotate: boolean;
  @Type(() => Number) Rows: number;
  @Type(() => Number) UpgradeFromRoomDesignId: number;

  @Exclude() Sprite: StaticSprite;
}