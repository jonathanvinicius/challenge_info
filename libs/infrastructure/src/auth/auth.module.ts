import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CognitoJwtStrategy } from './strategies/cognito.strategy';

@Module({
  controllers: [],
  imports: [PassportModule.register({ session: false })],
  providers: [CognitoJwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
