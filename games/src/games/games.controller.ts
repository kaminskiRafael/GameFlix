import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Game } from '@prisma/client';
import { CreateGameDto } from './dto/create-games.dto';
import { GamesService } from './games.service';
import { UserRole } from 'src/users/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';

@Controller('games')
export class GamesController {
  constructor(private service: GamesService) {}

  @Post('create')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createGame(@Body() data: CreateGameDto): Promise<Game> {
    return this.service.create(data);
  }

  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany(): Promise<Game[]> {
    return this.service.findMany();
  }

  @Get('find/:id')
  @UseGuards(AuthGuard())
  findUnique(@Param('id') id: string): Promise<Game> {
    return this.service.findUnique(id);
  }

  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }

  @Get('like/:id')
  @UseGuards(AuthGuard())
  likeGame(@AuthUser() user: User, @Param('id') gameId: string): Promise<User> {
    const userId = user.id;
    return this.service.likeGame(userId, gameId);
  }
}
