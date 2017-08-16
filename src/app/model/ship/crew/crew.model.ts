import { Type, Exclude } from 'class-transformer';
import { CharacterDesign } from '../data/character-design.model';

export class Crew {
  @Type(() => Number) AbilityImprovement: number;
  @Type(() => Number) AttackImprovement: number;
  @Type(() => Date) AvailableDate: Date;
  @Type(() => Number) CharacterDesignId: number;
  @Type(() => Number) CharacterId: number;
  @Type(() => String) CharacterName: string;
  @Type(() => Date) DeploymentDate: Date;
  @Type(() => Number) EngineImprovement: number;
  @Type(() => Number) Fatigue: number;
  @Type(() => Number) HpImprovement: number;
  @Type(() => String) ItemIds: string;
  @Type(() => String) Items: string;
  @Type(() => Number) Level: number;
  @Type(() => Number) OwnerShipId: number;
  @Type(() => Number) PilotImprovement: number;
  @Type(() => Number) RepairImprovement: number;
  @Type(() => Number) RoomId: number;
  @Type(() => Number) ShieldImprovement: number;
  @Type(() => Number) ShipId: number;
  @Type(() => Number) Stamina: number;
  @Type(() => Number) StaminaImprovement: number;
  @Type(() => Number) TrainingDesignId: number;
  @Type(() => Number) TrainingEndDate: number;
  @Type(() => Number) WeaponImprovement: number;
  @Type(() => Number) Xp: number;

  @Exclude() Design: CharacterDesign;
}