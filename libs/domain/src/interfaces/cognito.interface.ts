import { AuthLoginUserDto, CreateUserDto } from '@app/cognito/dtos';

export abstract class Cognito {
  abstract createUser(params: CreateUserDto): Promise<any>;
  abstract authenticateUser(params: AuthLoginUserDto): Promise<any>;
}
