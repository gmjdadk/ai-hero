import { Type, Exclude } from 'class-transformer';
import { StaticFile } from './static-file.model';

export class StaticSprite {
  @Type(() => Number) Height: number;
  @Type(() => Number) ImageFileId: number;
  @Type(() => Number) SpriteId: number;
  @Type(() => String) SpriteKey: string;
  @Type(() => Number) Width: number;
  @Type(() => Number) X: number;
  @Type(() => Number) Y: number;

  @Exclude() File: StaticFile;
}