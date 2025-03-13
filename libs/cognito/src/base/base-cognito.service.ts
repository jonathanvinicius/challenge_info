import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Type,
} from '@nestjs/common';
import { IUsecase } from '@app/domain';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export abstract class BaseCognitoService {
  protected readonly cognitoClient: CognitoIdentityProviderClient;
  protected readonly logger: Logger;
  protected readonly userPoolId: string;
  protected readonly clientId: string;

  constructor() {
    this.userPoolId = process.env.COGNITO_USER_POOL_ID;
    this.clientId = process.env.COGNITO_CLIENT_ID;
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION,
    });
    this.logger = new Logger(this.constructor.name);
  }

  handleErrorResponse(error: string, usecase: Type<IUsecase>) {
    this.logger.error(`${usecase.name}:` + error);
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
}
