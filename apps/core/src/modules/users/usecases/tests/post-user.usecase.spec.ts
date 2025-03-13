import { Test, TestingModule } from '@nestjs/testing';
import { PostUserUseCase } from '../post-user.usecase';
import { ConfigMock } from '@app/infrastructure/config/config.mock';
import { createUser } from '@app/infrastructure/database/repositories/users/factories/user-repository-factory';
import { MockCognitoService } from '@app/cognito/mocks/cognito-service.mock';
import { Cognito } from '@app/domain';
import { UnprocessableEntityException } from '@nestjs/common';

describe('PostUserUseCase', () => {
  let useCase: PostUserUseCase;
  let createdUser: any;
  let mockCognitoService: MockCognitoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...ConfigMock],
      providers: [
        PostUserUseCase,
        {
          provide: Cognito,
          useClass: MockCognitoService,
        },
      ],
    }).compile();

    useCase = module.get<PostUserUseCase>(PostUserUseCase);
    mockCognitoService = module.get<Cognito>(Cognito) as MockCognitoService;
    createdUser = await createUser();
  });

  it('should be defined', async () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should save user', async () => {
      jest
        .spyOn(mockCognitoService, 'createUser')
        .mockResolvedValue('fake-cognito-id');

      const result = await useCase.execute({
        name: createdUser.name,
        email: 'johndoe@gmail.com',
        password: createdUser.password,
        groupName: createdUser.groupName,
        username: 'johndoe',
      });

      expect(result).toBeDefined();
      expect(mockCognitoService.createUser).toHaveBeenCalled();
      expect(mockCognitoService.createUser).toHaveBeenCalledWith({
        email: 'johndoe@gmail.com',
        name: createdUser.name,
        password: createdUser.password,
        username: 'johndoe',
        groupName: createdUser.groupName,
      });
      expect(mockCognitoService.createUser).toHaveBeenCalledTimes(1);
      expect(mockCognitoService.authenticateUser).toHaveBeenCalledTimes(0);
    });
  });

  it('should generate a 422 error if the user already exists', async () => {
    try {
      await useCase.execute({
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        groupName: createdUser.groupName,
        username: createdUser.username,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);
      expect(error.response.message).toStrictEqual([`User already exists`]);
      expect(error.response.statusCode).toBe(422);
    }
  });
});
