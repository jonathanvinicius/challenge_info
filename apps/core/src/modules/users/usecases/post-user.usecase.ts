import { Cognito, IUsecase, PostMessageDto } from '@app/domain';
import { UserRepository } from '@app/infrastructure';
import { Injectable } from '@nestjs/common';
import { PostUserDto } from '../dtos';
import { throwUnprocessableEntity } from '@app/domain/global/errors';
import { Op } from 'sequelize';

@Injectable()
export class PostUserUseCase implements IUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cognitoService: Cognito,
  ) {}

  async execute(userData: PostUserDto): Promise<PostMessageDto> {
    await this.validateUserExists(userData.email, userData.username);

    const userCognito = await this.cognitoService.createUser(userData);

    const user = await this.userRepository.create({
      ...userData,
      cognitoId: userCognito,
    });

    return new PostMessageDto(user.id, 'User created successfully');
  }

  private async validateUserExists(email: string, username: string) {
    const userExists = await this.userRepository.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (userExists) {
      throwUnprocessableEntity('User already exists');
    }
  }
}
