import { Test, TestingModule } from '@nestjs/testing';
import { ConfigMock } from '@app/infrastructure/config/config.mock';
import { createUser } from '@app/infrastructure/database/repositories/users/factories/user-repository-factory';
import { MockCognitoService } from '@app/cognito/mocks/cognito-service.mock';
import { Cognito } from '@app/domain';
import { PostAuthenticationUserUsecase } from '../post-authentication-user.usecase';

describe('PostAuthenticationUserUsecase', () => {
  let useCase: PostAuthenticationUserUsecase;
  let createdUser: any;
  let mockCognitoService: MockCognitoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...ConfigMock],
      providers: [
        PostAuthenticationUserUsecase,
        {
          provide: Cognito,
          useClass: MockCognitoService,
        },
      ],
    }).compile();

    useCase = module.get<PostAuthenticationUserUsecase>(
      PostAuthenticationUserUsecase,
    );
    mockCognitoService = module.get<Cognito>(Cognito) as MockCognitoService;

    createdUser = await createUser();
  });

  it('should be defined', async () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should authentication user', async () => {
      await useCase.execute({
        username: createdUser.username,
        password: 'any_password',
      });

      expect(mockCognitoService.authenticateUser).toHaveBeenCalled();
      expect(mockCognitoService.authenticateUser).toHaveBeenCalledWith({
        username: createdUser.username,
        password: 'any_password',
      });
      expect(mockCognitoService.authenticateUser).toHaveBeenCalledTimes(1);
      expect(mockCognitoService.createUser).toHaveBeenCalledTimes(0);
    });
  });
});
