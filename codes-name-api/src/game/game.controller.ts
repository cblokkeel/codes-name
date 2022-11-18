import { GameService } from './game.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGameDto } from 'src/dtos/game.dtos';

@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @Get(':room')
  async findGameByRoom(@Body('room') room: string) {
    return this.gameService.findGameByRoom(room);
  }
}
