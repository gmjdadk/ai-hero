import { Type, Exclude } from 'class-transformer';
import { ShipDesign } from '../data/ship-design.model';

export class Ship {
  @Type(() => Number) BrightnessValue: number;
  @Type(() => Number) Hp: number;
  @Type(() => Number) HueValue: number;
  @Type(() => Date) ImmunityDate: Date;
  @Type(() => String) Lifts: string;
  @Type(() => Number) OriginalRaceId: number;
  @Type(() => Number) SaturationValue: number;
  @Type(() => Number) Shield: number;
  @Type(() => Number) ShipDesignId: number;
  @Type(() => Number) ShipId: number;
  @Type(() => String) ShipName: string;
  @Type(() => String) ShipStatus: string;
  @Type(() => Number) SkinItemDesignId: number;
  @Type(() => Number) StandardCharacterDraws: number;
  @Type(() => Date) StatusStartDate: Date;
  @Type(() => String) StickerString: string;
  @Type(() => Number) UniqueCharacterDraws: number;
  @Type(() => Date) UpdateDate: Date;
  @Type(() => Number) UpgradeShipDesignId: number;
  @Type(() => Date) UpgradeStartDate: Date;
  @Type(() => Number) UserId: number;

  @Exclude() Design: ShipDesign;

  @Exclude() MetaRawRooms: Object[];
  @Exclude() MetaRawCharacters: Object[];
}