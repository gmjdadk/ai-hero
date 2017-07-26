import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Type, plainToClass } from 'class-transformer';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

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

@Injectable()
export class CharacterDesignService {
  // Data services can be cached as they only change between patches
  private characterDesigns: Observable<CharacterDesign[]>;
  private characterDesignsMap: Observable<Map<number, CharacterDesign>>;

  constructor(private http: Http) { }

  getCharacterDesigns(): Observable<CharacterDesign[]> {
    return this.characterDesigns
      ? this.characterDesigns
      : this.characterDesigns = this.http
        .get('pss:/CharacterService/ListAllCharacterDesigns2?languageKey=en', {})
        .map(res => xml.parse(res.text()))
        .map(res => res['ListAllCharacterDesigns']['CharacterDesigns']['CharacterDesign'])
        .map(res => plainToClass(CharacterDesign, res as Object[]))
        .publishReplay(1)
        .refCount();
  }

  getCharacterDesignsMap(): Observable<Map<number, CharacterDesign>> {
    return this.characterDesignsMap
      ? this.characterDesignsMap
      : this.characterDesignsMap = this.getCharacterDesigns()
        .map(res => new Map(res.map(v => [v.CharacterDesignId, v] as [number, CharacterDesign])))
        .publishReplay(1)
        .refCount();
  }

  getCharacterDesignById(id: number): Observable<{ exists: boolean, design?: CharacterDesign }> {
    return this.getCharacterDesignsMap()
      .map(res => res.get(id))
      .map(res => { return { exists: res !== undefined, design: res } });
  }
}
