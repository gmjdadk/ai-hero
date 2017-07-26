import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Type, Exclude, plainToClass } from 'class-transformer';

import { CharacterDesign, CharacterDesignService } from '../data/character-design.service';

import * as xml from 'pixl-xml';
import 'rxjs';
import { Observable } from 'rxjs';

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

@Injectable()
export class CrewService {

  constructor(
    private http: Http,
    private characterDesignService: CharacterDesignService
  ) { }

  private annotateCrewWithDesign(crew: Crew): Observable<Crew> {
    let clone = Object.assign(Object.create(Object.getPrototypeOf(crew)), crew);
    return this.characterDesignService.getCharacterDesignById(crew.CharacterDesignId)
      .map(res => {
        clone.Design = res.exists? res.design : null;
        return clone;
      });
  }

  getCrewByToken(token: string): Observable<Crew[]> {
    return this.http
      .get('pss:/CharacterService/ListAllCharactersOfUser?accessToken=' + encodeURIComponent(token))
      .map(res => xml.parse(res.text()))
      .map(res => res['ListAllCharactersOfUser']['Characters']['Character'])
      .map(res => plainToClass(Crew, res as Object[]))
      .map(res => res.map(c => this.annotateCrewWithDesign(c)))
      .flatMap(res => Observable.forkJoin(res));
  }

  getCrewByTokenMap(token: string): Observable<Map<number, Crew>> {
    return this.getCrewByToken(token)
      .map(res => new Map(res.map(v => [v.CharacterId, v] as [number, Crew])))
  }
}
