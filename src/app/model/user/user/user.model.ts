import { Exclude, Type } from 'class-transformer';
import { UserBrief } from '../user-brief/user-brief.model';
import { Ship } from '../../ship/ship/ship.model';

export class User extends UserBrief {
  @Exclude() MetaRawShip?: Object; // Used for meta-inf
}
