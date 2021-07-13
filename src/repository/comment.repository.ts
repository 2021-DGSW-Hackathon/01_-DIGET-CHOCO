import Comment from "src/models/Comment";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Comment)
export default class CommentRepository extends Repository<Comment> {

  async findCommentByIdx(idx: number) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.idx =:idx', { idx })
      .getOne();
  }
}