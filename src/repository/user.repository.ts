import User from "src/models/User";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  findUserByIdx(userId: string) {
    return this.createQueryBuilder()
      .where('user_id = :userId', { userId })
      .getOne()
  }
}