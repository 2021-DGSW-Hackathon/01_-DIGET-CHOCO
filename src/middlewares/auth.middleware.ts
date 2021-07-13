import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { JWT } from "src/config/dotenv";
import { UserRepository } from "src/repository/user.repository";
import jwt from 'jsonwebtoken';

@Injectable()
export default class AuthGaurd implements CanActivate {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token: string | string[] = request.headers['access-token'];

    if (token === undefined) {

      throw new UnauthorizedException('토큰이 전송되지 않았습니다');
    }

    if (Array.isArray(token)) {

      throw new BadRequestException('잘못된 토큰입니다');
    }

    const verifyToken: any = await this.verify(token);

    const user = await this.userRepository.findUserByIdx(verifyToken.userIdx);

    request.user = user;

    return true;
  }

  private async verify(token: string) {

    try {

      return jwt.verify(token, JWT.SECRET);
    } catch (err) {

      switch (err.message) {
        case 'jwt must be provided':
          throw new BadRequestException('토큰이 전송되지 않았습니다');
        case 'jwt malformed':
        case 'invalid token':
        case 'invalid signature':
          throw new UnauthorizedException('위조된 토큰입니다');
        case 'jwt expired':
          throw new GoneException('토큰이 만료되었습니다');
        default:

          Logger.error(err);
          throw new InternalServerErrorException('다시 시도해 주세요');
      }
    }
  }
}