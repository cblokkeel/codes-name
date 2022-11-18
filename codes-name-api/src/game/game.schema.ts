import { GameStatus } from './../../../types/index.d';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop()
  room: string;

  @Prop()
  game: GameStatus;
}

export const GameSchema = SchemaFactory.createForClass(Game);
