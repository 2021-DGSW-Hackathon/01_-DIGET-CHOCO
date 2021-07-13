import { ForbiddenException, GoneException, Injectable } from '@nestjs/common';
import { HotplaceService } from 'src/hotplace/hotplace.service';
import User from 'src/models/User';
import CommentRepository from 'src/repository/comment.repository';
import AddCommentDto from './dto/addComment.dto';

@Injectable()
export class CommentService {

  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly hotplaceService: HotplaceService,
  ) { }

  async findCommentByIdx(idx: number) {

    const comment = await this.commentRepository.findCommentByIdx(idx);

    if (comment === undefined) {

      throw new GoneException('없는 댓글입니다');
    }

    return comment;
  }

  async addComment(idx: number, user: User, addCommentDto: AddCommentDto) {

    const hotplace = await this.hotplaceService.getHotplaceByIdx(idx);

    const $comment = this.commentRepository.create(addCommentDto);
    $comment.hotplace = hotplace;
    $comment.user = user;
    await this.commentRepository.save($comment);
  }

  async deleteComment(idx: number, user: User) {

    const comment = await this.findCommentByIdx(idx);

    if (comment.user.userId !== user.userId) {

      throw new ForbiddenException('자신의 댓글이 아닙니다');
    }

    await this.commentRepository.remove(comment);
  }
}
