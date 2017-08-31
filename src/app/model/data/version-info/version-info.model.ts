import { Type, Exclude } from 'class-transformer';

export class VersionInfo {
  @Type(() => Number) SettingId: number;
  @Type(() => Number) ServerSettingVersion: number;
  @Type(() => Number) MinimumClientVersion: number;
  @Type(() => String) News: string;
  @Type(() => String) MaintenanceMessage: string;
  @Type(() => String) DailyRewardType: string;
  @Type(() => String) DailyRewardArgument: string;
  @Type(() => String) SaleType: string;
  @Type(() => String) SaleArgument: string;
  @Type(() => String) SaleItemMask: string;
  @Type(() => String) SaleOnceOnly: string;
  @Type(() => Number) FileVersion: number;
  @Type(() => Number) SpriteVersion: number;
  @Type(() => Number) CharacterDesignVersion: number;
  @Type(() => Number) CharacterPartVersion: number;
  @Type(() => Number) AnimationVersion: number;
  @Type(() => Number) RoomDesignVersion: number;
  @Type(() => Number) MissileDesignVersion: number;
  @Type(() => Number) ResearchDesignVersion: number;
  @Type(() => Number) RoomDesignSpriteVersion: number;
  @Type(() => Number) AchievementDesignVersion: number;
  @Type(() => Number) ConditionTypeVersion: number;
  @Type(() => Number) CraftDesignVersion: number;
  @Type(() => Number) ItemDesignVersion: number;
  @Type(() => Number) ActionTypeVersion: number;
  @Type(() => Number) RoomDesignPurchaseVersion: number;
  @Type(() => Number) ShipDesignVersion: number;
  @Type(() => Number) LeagueVersion: number;
  @Type(() => Number) BackgroundVersion: number;
  @Type(() => Number) MissionDesignVersion: number;
  @Type(() => Number) SaleQuantity: number;
  @Type(() => Number) TrainingDesignVersion: number;
  @Type(() => Number) FeatureMask: number;
  @Type(() => String) DailyItemRewards: string;
  @Type(() => String) LimitedCatalogType: string;
  @Type(() => String) LimitedCatalogArgument: string;
  @Type(() => Number) LimitedCatalogQuantity: number;
  @Type(() => Date) LimitedCatalogExpiryDate: Date;
  @Type(() => String) LimitedCatalogCurrencyType: string;
  @Type(() => Number) LimitedCatalogCurrencyAmount: number;
  @Type(() => Number) LimitedCatalogMaxTotal: number;
  @Type(() => String) CargoItems: string;
  @Type(() => String) CargoPrices: string;
  @Type(() => Number) ChallengeDesignVersion: number;
  @Type(() => String) ProductionServer: string;
  @Type(() => Number) Flags: number;
  @Type(() => Number) CharacterDesignActionVersion: number;
  @Type(() => Number) NewUserCount: number;
  @Type(() => Date) SaleStartDate: Date;
  @Type(() => Date) SaleEndDate: Date;
  @Type(() => Number) NewsSpriteId: number;
  @Type(() => Date) NewsUpdateDate: Date;
  @Type(() => Date) ReplayAvailableDate: Date;
  @Type(() => Number) CommonCrewId: number;
  @Type(() => Number) BackgroundId: number;
  @Type(() => Number) HeroCrewId: number;
}