import { Injectable } from '@nestjs/common';
import {
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { IUsecase } from '@app/domain';
import { AuthLoginUserDto } from '../dtos';
import { AuthenticationUserResponse } from '../responses';
import {
  throwDefaultError,
  unauthorizedException,
} from '@app/domain/global/errors';
import { BaseCognitoService } from '../base';
import { generateSecretHashCognito } from '@app/infrastructure/utils';

@Injectable()
export class AuthenticationUserUseCase
  extends BaseCognitoService
  implements IUsecase
{
  async execute(params: AuthLoginUserDto): Promise<AuthenticationUserResponse> {
    const { username, password } = params;

    const authParams: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: generateSecretHashCognito(
          this.clientId,
          process.env.COGNITO_CLIENT_SECRET,
          username,
        ),
      },
    };

    try {
      const command = new InitiateAuthCommand(authParams);
      const response = await this.cognitoClient.send(command);

      if (!response.AuthenticationResult) {
        throw new Error('Authentication failed');
      }

      const { AccessToken, RefreshToken } = response.AuthenticationResult;

      return {
        accessToken: AccessToken,
        refreshToken: RefreshToken,
      };
    } catch (err) {
      if (
        err.name === 'NotAuthorizedException' &&
        err.message === 'Incorrect username or password.'
      ) {
        unauthorizedException('Incorrect username or password.');
      }

      throwDefaultError(err.message || 'Error authenticating the user.');
    }
  }
}
