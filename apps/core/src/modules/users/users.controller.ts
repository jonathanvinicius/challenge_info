import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostAuthenticationUserUsecase, PostUserUseCase } from './usecases';
import { RESOURCE_USERS } from '../../docs/resources';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationUserDto, PostUserDto } from './dtos';
import { ResponsePostMessage } from '@app/domain/responses';
import { ApiDataResponse, Public, Roles } from '@app/domain';
import { AuthenticationUserResponse } from './responses';
import { UserRoleGuard } from '@app/infrastructure/guards';

@ApiBearerAuth()
@ApiTags(RESOURCE_USERS.tag)
@Controller(RESOURCE_USERS.route)
@UseGuards(UserRoleGuard)
export class UsersController {
  constructor(
    private readonly postUserUseCase: PostUserUseCase,
    private readonly postAuthenticationUserUseCase: PostAuthenticationUserUsecase,
  ) {}

  @Roles(['Admin'])
  @ApiOperation({ summary: 'Create user' })
  @ApiDataResponse({
    type: ResponsePostMessage,
    status: HttpStatus.CREATED,
  })
  @Post()
  @ApiTags(RESOURCE_USERS.tag)
  @ApiTags(RESOURCE_USERS.tag)
  postOrderUser(@Body() body: PostUserDto) {
    return this.postUserUseCase.execute(body);
  }

  @Public()
  @ApiOperation({ summary: 'Authentication user', security: [] })
  @ApiDataResponse({
    status: 200,
    description: 'User authenticated successfully',
    type: AuthenticationUserResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/authentication')
  authenticateUser(@Body() body: AuthenticationUserDto) {
    return this.postAuthenticationUserUseCase.execute(body);
  }
}
