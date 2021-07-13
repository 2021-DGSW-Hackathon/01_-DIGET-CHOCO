import { Body, Controller, Get, Post } from '@nestjs/common';
import GetTokenDto from './dto/getTokenDto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {

  constructor(
    private readonly tokenService: TokenService,
  ) { }

  @Get('dauth')
  async getToken(
    @Body() getTokenDto: GetTokenDto,
  ) {

    const token = this.tokenService.getToken(getTokenDto.code);
  }
}