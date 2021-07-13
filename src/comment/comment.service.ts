import { Injectable } from '@nestjs/common';
import User from 'src/models/User';
import CommentRepository from 'src/repository/comment.repository';
import AddCommentDto from './dto/addComment.dto';

@Injectable()
export class CommentService {

  constructor(
    private readonly commentRepository: CommentRepository,
  ) { }

  async addComment(user: User, addCommentDto: AddCommentDto) {

    const $comment = this.commentRepository.create(addCommentDto);
    $comment.user = user;
    await this.commentRepository.save($comment);
  }
}
