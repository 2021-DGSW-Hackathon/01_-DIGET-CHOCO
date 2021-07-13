import { Injectable } from '@nestjs/common';
import Hotplace from 'src/models/hotplace';
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

  async getAllHotplace(option?: 'star' | 'comment') {

    const hotplaces: any = await this.hotpalceRepository.getAllHotplace()

    for (const [key, value] of hotplaces.entries()) {
      let cnt = 0;

      for (const j of value.comment) {

        cnt += j.star;
      }

      hotplaces[key].star = (cnt / value.comment.length);
    }

    if (option === 'comment') {

      hotplaces.sort((a: Hotplace, b: Hotplace) => b.comment.length - a.comment.length);
      return hotplaces;
    }

    if (option === 'star') {

      hotplaces.sort((a, b) => b.star - a.star);
      return hotplaces;
    }

    return hotplaces;
  }

  async getFiveHotplace() {

    const hotplaces: any = await this.hotpalceRepository.getAllHotplace()

    for (const [key, value] of hotplaces.entries()) {
      let cnt = 0;

      for (const j of value.comment) {

        cnt += j.star;
      }

      hotplaces[key].star = (cnt / value.comment.length);
    }

    hotplaces.sort((a, b) => b.star - a.star);

    return hotplaces.splice(0, 4);
  }
}
