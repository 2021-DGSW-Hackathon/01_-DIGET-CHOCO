import { Injectable } from '@nestjs/common';
import User from 'src/models/User';
import { HotpalceRepository } from 'src/repository/hotplace.repository';
import AddHotplaceDto from './dto/addHotplace.dto';

@Injectable()
export class HotplaceService {

  constructor(
    private readonly hotpalceRepository: HotpalceRepository,
  ) { }

  async addHotplace(user: User, addHotplaceDto: AddHotplaceDto) {

    const $hotpalce = this.hotpalceRepository.create(addHotplaceDto);
    $hotpalce.user = user;
    await this.hotpalceRepository.save($hotpalce);
  }

}
