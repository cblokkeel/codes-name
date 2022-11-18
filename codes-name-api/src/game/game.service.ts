import { GameStatus, Board } from './../../../types/index.d';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from 'src/dtos/game.dtos';
import { Game, GameDocument } from './game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel('Game') private gameModel: Model<GameDocument>) {}

  async createGame(createGame: CreateGameDto): Promise<Game> {
    const createdGame = new this.gameModel(createGame);
    const newBoard: Board = this.generateBoard();
    createdGame.set('board', newBoard);
    return createdGame.save();
  }

  async findGameByRoom(room: string): Promise<Game> {
    return this.gameModel.findOne({ room });
  }

  private generateBoard(): Board {
    return {
      board: [[], []],
    };
  }
}
