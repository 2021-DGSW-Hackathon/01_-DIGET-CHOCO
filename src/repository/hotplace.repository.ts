import Hotplace from "src/models/Hotplace";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Hotplace)
export class HotpalceRepository extends Repository<Hotplace> {

  getAllHotplace() {
    return this.createQueryBuilder('hotplace')
      .leftJoinAndSelect('hotplace.comment', 'comment')
      .leftJoinAndSelect('hotplace.user', 'user')
      .leftJoinAndSelect('comment.user', 'user1')
      .orderBy('hotplace.createdAt', 'DESC')
      .getMany();
  }

  getSearchHotplace(keyword: string) {
    return this.createQueryBuilder('hotplace')
      .leftJoinAndSelect('hotplace.comment', 'comment')
      .leftJoinAndSelect('hotplace.user', 'user')
      .leftJoinAndSelect('comment.user', 'user1')
      .where('hotplace.name like :keyword', { keyword: `%${keyword}%` })
      .orderBy('hotplace.createdAt', 'DESC')
      .getMany();
  }

  getHotplaceByIdx(idx: number) {
    return this.createQueryBuilder('hotplace')
      .leftJoinAndSelect('hotplace.comment', 'comment')
      .leftJoinAndSelect('hotplace.user', 'user')
      .leftJoinAndSelect('comment.user', 'user1')
      .where('hotplace.idx = :idx', { idx })
      .getOne();
  }

}