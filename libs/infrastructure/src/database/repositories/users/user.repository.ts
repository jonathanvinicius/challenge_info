import { Injectable } from '@nestjs/common';
import { UserModel } from '../../models';
import { BaseRepository } from '../base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserModel> {
  constructor() {
    super(UserModel);
  }
}
