import { Cognito, IUsecase } from '@app/domain';
import { Injectable } from '@nestjs/common';
import { AuthenticationUserResponse } from '../responses';
import { AuthenticationUserDto } from '../dtos';

@Injectable()
export class PostAuthenticationUserUsecase implements IUsecase {
  constructor(private readonly cognitoService: Cognito) {}

  async execute(
    authLoginUserDto: AuthenticationUserDto,
  ): Promise<AuthenticationUserResponse> {
    return this.cognitoService.authenticateUser(authLoginUserDto);
  }
}
