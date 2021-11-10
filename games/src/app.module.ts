import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, GamesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
