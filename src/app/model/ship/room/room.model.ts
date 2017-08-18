import { Type, Exclude } from 'class-transformer';
import { RoomDesign } from '../../data/room-design/room-design.model';

export class Room {
  @Type(() => Number) CapacityUsed: number;
  @Type(() => Number) Column: number;
  @Type(() => Date) ConstructionStartDate: Date;
  @Type(() => String) ItemIds: string;
  @Type(() => String) ManufactureItemDesignIds: string;
  @Type(() => Date) ManufactureStartDate: Date;
  @Type(() => String) Manufactured: string;
  @Type(() => Number) PowerGenerated: number;
  @Type(() => Number) RandomSeed: number;
  @Type(() => Number) RoomDesignId: number;
  @Type(() => Number) RoomId: number;
  @Type(() => String) RoomStatus: string;
  @Type(() => Number) Row: number;
  @Type(() => Number) ShipId: number;
  @Type(() => Number) UpgradeRoomDesignId: number;

  @Exclude() Design: RoomDesign;
  @Exclude() Links: Room[] = [];
}
