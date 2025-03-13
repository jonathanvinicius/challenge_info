import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Matches } from 'class-validator';
import { UserGroupEnum } from '../enums';

export class PostUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
    { message: 'invalid password' },
  )
  @ApiProperty()
  password: string;

  @IsEnum(UserGroupEnum)
  @ApiProperty({
    description: 'group that the user will belong to',
    enum: UserGroupEnum,
    example: UserGroupEnum.ADMIN,
  })
  groupName: UserGroupEnum;
}
