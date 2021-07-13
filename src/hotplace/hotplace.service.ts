import { ForbiddenException, GoneException, Injectable } from '@nestjs/common';
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

  async getHotplaceByIdx(idx: number) {

    const hotplace = await this.hotpalceRepository.getHotplaceByIdx(idx);

    if (hotplace === undefined) {

      throw new GoneException('없는 장소입니다');
    }

    return hotplace;
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

  async modiftHotplace(idx: number, user: User, addHotplaceDto: AddHotplaceDto) {

    const hotplace = await this.getHotplaceByIdx(idx);

    if (hotplace.user.userId !== user.userId) {

      throw new ForbiddenException('나의 게시물이 아닙니다');
    }

    this.hotpalceRepository.merge(hotplace, addHotplaceDto);
    await this.hotpalceRepository.save(hotplace);
  }

  async deleteHotplace(idx: number, user: User) {

    const hotplace = await this.getHotplaceByIdx(idx);

    if (hotplace.user.userId !== user.userId) {

      throw new ForbiddenException('나의 게시물이 아닙니다');
    }

    await this.hotpalceRepository.remove(hotplace);
  }
}
