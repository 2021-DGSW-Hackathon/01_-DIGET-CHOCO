import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorFilter } from 'src/filters/error.filter';
import { UserRepository } from 'src/repository/user.repository';
import { getInfo, getToken } from '../libs/axios.lib';

@Injectable()
export class TokenService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async getToken(code: string) {

    if (code === '' || code === null) {
      throw new BadRequestException('잘못된 code입니다');
    }

    const datuhToken = await getToken(code);
    const dodamInfo = await getInfo(datuhToken.token);
    console.log(dodamInfo);

    const user = await this.userRepository.save({
      userId: dodamInfo.uniqueId,
      name: dodamInfo.name,
      grade: dodamInfo.grade,
      room: dodamInfo.room,
      number: dodamInfo.number,
      profileImage: dodamInfo.profileImage,
    });

    const token = this.jwtService.sign(user.userId);

    return {
      user,
      dauthToken: datuhToken.token,
      token,
    };
  }
}
