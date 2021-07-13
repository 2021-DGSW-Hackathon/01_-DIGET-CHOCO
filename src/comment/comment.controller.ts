import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorators/token.decorator';
import { CommentService } from './comment.service';
import User from '../models/User';
import AddCommentDto from './dto/addComment.dto';
import BaseResponse from 'src/response/base.response';

@Controller('comment')
export class CommentController {

  constructor(
    private readonly commentService: CommentService
  ) { }

  @Post()
  @UseGuards()
  async addComment(
    @Token() user: User,
    @Body() addCommentDto: AddCommentDto,
  ) {

    await this.commentService.addComment(user, addCommentDto);

    return new BaseResponse(200, '추가 완료');
  }
}
