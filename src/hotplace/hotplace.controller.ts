import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorators/token.decorator';
import AuthGaurd from 'src/middlewares/auth.middleware';
import User from 'src/models/User';
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

    const a = await this.hotplaceService.addHotplace(addHotplaceDto);
  }
}
