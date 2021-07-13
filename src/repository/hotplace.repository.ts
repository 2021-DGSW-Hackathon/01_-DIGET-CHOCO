import Hotplace from "src/models/hotplace";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Hotplace)
export class HotpalceRepository extends Repository<Hotplace> {

  getAllHotplace() {
    return this.createQueryBuilder('hotplace')
      .leftJoinAndSelect('hotplace.comment', 'comment')
      .orderBy('hotplace.createdAt', 'DESC')
      .getMany();
  }

  getHotplaceByIdx(idx: number) {
    return this.createQueryBuilder('hotplace')
      .leftJoinAndSelect('hotplace.comment', 'comment')
      .leftJoinAndSelect('hotplace.user', 'user')
      .where('idx = :idx', { idx })
      .getOne();
  }
}