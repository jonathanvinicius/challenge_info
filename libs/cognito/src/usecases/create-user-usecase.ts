import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { IUsecase } from '@app/domain';
import { BaseCognitoService } from '../base';
import { CreateUserDto } from '../dtos';
import { throwDefaultError } from '@app/domain/global/errors';

@Injectable()
export class CreateUserUseCase extends BaseCognitoService implements IUsecase {
  async execute(params: CreateUserDto): Promise<string> {
    const { name, username, email, password, groupName } = params;

    try {
      const createUserCommand = new AdminCreateUserCommand({
        UserPoolId: this.userPoolId,
        Username: username,
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'username', Value: username },
          { Name: 'name', Value: name },
          { Name: 'email_verified', Value: 'true' },
        ],
      });

      const createdUserResponse =
        await this.cognitoClient.send(createUserCommand);

      const setPasswordCommand = new AdminSetUserPasswordCommand({
        UserPoolId: this.userPoolId,
        Username: username,
        Password: password,
        Permanent: true,
      });

      await this.cognitoClient.send(setPasswordCommand);

      const addUserToGroupCommand = new AdminAddUserToGroupCommand({
        UserPoolId: this.userPoolId,
        Username: username,
        GroupName: groupName,
      });

      await this.cognitoClient.send(addUserToGroupCommand);

      const subAttr = createdUserResponse.User?.Attributes?.find(
        (attr) => attr.Name === 'sub',
      );

      const userId = subAttr?.Value;

      return userId;
    } catch (error) {
      this.handleErrorResponse(error, CreateUserUseCase);
      throwDefaultError(error.message || 'Unable to create user');
    }
  }
}
