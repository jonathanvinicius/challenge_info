import { Cognito } from '@app/domain/interfaces/cognito.interface';
import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './usecases/create-user-usecase';
import { AuthenticationUserUseCase } from './usecases';
import { AuthLoginUserDto, CreateUserDto } from './dtos';

@Injectable()
export class CognitoService implements Cognito {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authenticationUserUseCase: AuthenticationUserUseCase,
  ) {}

  async createUser(params: CreateUserDto): Promise<string> {
    return this.createUserUseCase.execute(params);
  }

  async authenticateUser(params: AuthLoginUserDto): Promise<any> {
    return this.authenticationUserUseCase.execute(params);
  }
}
