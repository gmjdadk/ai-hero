import { Exclude, Type } from 'class-transformer';
import { Ship } from '../ship/ship.model';

export class User {
  @Type(() => Number) Id: number;

  @Exclude() MetaRawShip?: Object; // Used for meta-inf
}