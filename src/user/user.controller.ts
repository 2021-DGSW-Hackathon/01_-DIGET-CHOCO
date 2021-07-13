import { Controller, Get, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorators/token.decorator';
import AuthGaurd from 'src/middlewares/auth.middleware';
import User from 'src/models/User';
import BaseResponse from 'src/response/base.response';

@Controller('user')
export class UserController {

  @Get()
  @UseGuards(AuthGaurd)
  async getUser(
    @Token() user: User,
  ) {

    return new BaseResponse(200, '조회 성공', user);
  }
}
