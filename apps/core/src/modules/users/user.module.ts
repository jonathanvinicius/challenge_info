import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PostAuthenticationUserUsecase, PostUserUseCase } from './usecases';
import { CognitoModule } from '@app/cognito';
import { AuthModule } from '@app/infrastructure/auth';

@Module({
  imports: [AuthModule, CognitoModule],
  controllers: [UsersController],
  providers: [PostUserUseCase, PostAuthenticationUserUsecase],
})
export class UsersModule {}
