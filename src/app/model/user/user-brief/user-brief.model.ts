import { Exclude, Type } from 'class-transformer';

// This is different from regular User, as I have explicitly only included the properties
// that are sensibly populated by the server for bulk user retrieval calls i.e. search by name.
// The rest of the values are bogus or not sent, so for convenience these will throw a typing error.
export class UserBrief {
  @Type(() => Number) AllianceId: number;
  @Type(() => Date) AllianceJoinDate: Date;
  @Type(() => String) AllianceMembership: string;
  @Type(() => String) AllianceName: string;
  @Type(() => Number) AllianceSpriteId: number;
  @Type(() => Number) AllianceSupplyDonation: number;
  @Type(() => Date) CreationDate: Date;
  @Type(() => Number) CrewDonated: number;
  @Type(() => Number) CrewReceived: number;
  @Type(() => Number) IconSpriteId: number;
  @Type(() => String) Name: string;
  @Type(() => Number) Trophy: number;
  @Type(() => String) UserType: string;
  @Type(() => Number) Id: number;
}
