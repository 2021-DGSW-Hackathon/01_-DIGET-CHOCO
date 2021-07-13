import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import BaseResponse from 'src/response/base.response';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {

  constructor(
    private readonly tokenService: TokenService,
  ) { }

  @Get()
  async getToken(
    @Query('code') code: string
  ) {

    const tokenInfo = await this.tokenService.getToken(code);

    return new BaseResponse(200, '조회 성공', tokenInfo);
  }
}