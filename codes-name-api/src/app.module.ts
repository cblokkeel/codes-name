import { GameGateway } from './game/game.gateway';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27018/codes-name')],
  controllers: [AppController],
  providers: [AppService, GameGateway],
})
export class AppModule {}
