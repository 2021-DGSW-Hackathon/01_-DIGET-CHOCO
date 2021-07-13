import { Injectable } from '@nestjs/common';
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

  async addComment(idx: number, user: User, addCommentDto: AddCommentDto) {

    const hotplace = await this.hotplaceService.getHotplaceByIdx(idx);

    const $comment = this.commentRepository.create(addCommentDto);
    $comment.hotplace = hotplace;
    $comment.user = user;
    await this.commentRepository.save($comment);
  }
}
