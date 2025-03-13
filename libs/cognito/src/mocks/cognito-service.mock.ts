import { Cognito } from '@app/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockCognitoService implements Cognito {
  createUser = jest.fn();
  authenticateUser = jest.fn();
}
