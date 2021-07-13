import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class TokenService {

  constructor(
    private readonly userRepository: UserRepository
  ) { }
}
