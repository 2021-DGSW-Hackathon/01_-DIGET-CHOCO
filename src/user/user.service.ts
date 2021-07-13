import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async findUserById(userId: string) {

    const user = await this.userRepository.findUserByIdx(userId);

    if (user === undefined) {

      throw new UnauthorizedException('찾을 수 없는 유저입니다');
    }

    return user;
  }
}