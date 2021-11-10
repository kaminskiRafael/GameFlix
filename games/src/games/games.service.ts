import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Game, User } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.GamesCreateInput): Promise<Game> {
    const game = await this.db.games.create({ data });
    return game;
  }

  async findMany(): Promise<Game[]> {
    const game = await this.db.games.findMany();
    return game;
  }

  async findUnique(id: string): Promise<Game> {
    const game = await this.db.games.findUnique({
      where: { id },
    });

    if (!game) {
      throw new NotFoundException('ID Não encontrado na base de dados');
    }

    return game;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    await this.db.games.delete({
      where: { id },
    });

    return {
      message: 'Item deletado com sucesso',
    };
  }

  async likeGame(userId: string, gameId: string): Promise<User> {
    await this.db.user.update({
      where: { id: userId },
      data: {
        games: {
          connect: {
            id: gameId,
          },
        },
      },
    });

    return this.db.user.findUnique({
      where: { id: userId },
      include: {
        games: true,
      },
    });
  }
}
