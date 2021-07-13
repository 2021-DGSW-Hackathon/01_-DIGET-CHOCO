import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorators/token.decorator';
import AuthGaurd from 'src/middlewares/auth.middleware';
import User from 'src/models/User';
import BaseResponse from 'src/response/base.response';
import AddHotplaceDto from './dto/addHotplace.dto';
import { HotplaceService } from './hotplace.service';

@Controller('hotplace')
export class HotplaceController {

  constructor(
    private readonly hotplaceService: HotplaceService,
  ) { }

  @Post()
  @UseGuards(AuthGaurd)
  async addHotplace(
    @Token() user: User,
    @Body() addHotplaceDto: AddHotplaceDto
  ) {

    await this.hotplaceService.addHotplace(user, addHotplaceDto);

    return new BaseResponse(201, '추가 완료');
  }


  @Get('all')
  async getAllHotplace(
    @Query('option') option?: 'star' | 'comment',
  ) {

    const getAllHotplace = await this.hotplaceService.getAllHotplace(option);

    return new BaseResponse(200, `${option}별조회 완료`, getAllHotplace);
  }

  @Get('five')
  async getFiveHotplace() {

    const getFiveHotplace = await this.hotplaceService.getFiveHotplace();

    return new BaseResponse(200, `다섯개만 조회 완료`, getFiveHotplace);
  }

  @Get('search')
  async getSearchHotplace(
    @Query('keyword') keyword: string,
  ) {

    const searchHotplace = await this.hotplaceService.getSearch(keyword);

    return new BaseResponse(200, '검색 성공', searchHotplace);
  }

  @Get('/:idx')
  async getDetail(
    @Param('idx') idx: number,
  ) {

    const hotplace = await this.hotplaceService.getHotplaceByIdxPlus(idx);

    return new BaseResponse(200, '상세 조회 성공', hotplace);
  }

  @Put('/:idx')
  @UseGuards(AuthGaurd)
  async putHotplace(
    @Param('idx') idx: number,
    @Token() user: User,
    @Body() addHotplaceDto: AddHotplaceDto,
  ) {

    await this.hotplaceService.modiftHotplace(idx, user, addHotplaceDto);

    return new BaseResponse(200, `수정 완료`);
  }

  @Delete('/:idx')
  @UseGuards(AuthGaurd)
  async deleteHotplace(
    @Param('idx') idx: number,
    @Token() user: User,
  ) {

    await this.hotplaceService.deleteHotplace(idx, user);

    return new BaseResponse(200, `삭제 완료`);
  }
}
