import { Type } from 'class-transformer';

export class CharacterDesign {
  @Type(() => Number) ActionSoundFileId: number;
  @Type(() => Number) Attack: number;
  @Type(() => Number) CharacterBodyPartId: number;
  @Type(() => String) CharacterDesignDescription: string;
  @Type(() => Number) CharacterDesignId: number;
  @Type(() => String) CharacterDesignName: string;
  @Type(() => Number) CharacterHeadPartId: number;
  @Type(() => Number) CharacterLegPartId: number;
  @Type(() => Number) Engine: number;
  @Type(() => Number) EquipmentMask: number;
  @Type(() => Number) FinalAttack: number;
  @Type(() => Number) FinalEngine: number;
  @Type(() => Number) FinalHp: number;
  @Type(() => Number) FinalPilot: number;
  @Type(() => Number) FinalRepair: number;
  @Type(() => Number) FinalResearch: number;
  @Type(() => Number) FinalShield: number;
  @Type(() => Number) FinalWeapon: number;
  @Type(() => Number) FireResistance: number;
  @Type(() => Number) GasCost: number;
  @Type(() => Number) GenderType: number;
  @Type(() => Number) Hp: number;
  @Type(() => Number) Level: number;
  @Type(() => Number) MaxCharacterLevel: number;
  @Type(() => Number) MinShipLevel: number;
  @Type(() => Number) MineralCost: number;
  @Type(() => Number) Pilot: number;
  @Type(() => Number) ProfileSpriteId: number;
  @Type(() => String) ProgressionType: string;
  @Type(() => String) RaceType: string;
  @Type(() => String) Rarity: string;
  @Type(() => Number) Repair: number;
  @Type(() => Number) Research: number;
  @Type(() => Number) RunSpeed: number;
  @Type(() => Number) Shield: number;
  @Type(() => Number) SpecialAbilityArgument: number;
  @Type(() => Number) SpecialAbilityFinalArgument: number;
  @Type(() => String) SpecialAbilityType: string;
  @Type(() => String) SpeechPhrases: string;
  @Type(() => Number) SpeechPitch: number;
  @Type(() => Number) SpeechRate: number;
  @Type(() => String) SpeechVoice: string;
  @Type(() => Number) TapSoundFileId: number;
  @Type(() => Number) TrainingCapacity: number;
  @Type(() => Number) WalkingSpeed: number;
  @Type(() => Number) Weapon: number;
  @Type(() => Number) XpRequirementScale: number;
}
