import { GameService } from './game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GameSchema } from './game.schema';
import { GameController } from './game.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
