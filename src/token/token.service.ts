import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class TokenService {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async getToken(code: string) {

    if (code === '' || code === null) {
      throw new BadRequestException('잘못된 code입니다');
    }
  }
}
