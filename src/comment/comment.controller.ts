import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorators/token.decorator';
import { CommentService } from './comment.service';
import User from '../models/User';
import AddCommentDto from './dto/addComment.dto';
import BaseResponse from 'src/response/base.response';
import AuthGaurd from 'src/middlewares/auth.middleware';

@Controller('comment')
export class CommentController {

  constructor(
    private readonly commentService: CommentService
  ) { }

  @Post('/:idx')
  @UseGuards(AuthGaurd)
  async addComment(
    @Param('idx') idx: number,
    @Token() user: User,
    @Body() addCommentDto: AddCommentDto,
  ) {

    await this.commentService.addComment(idx, user, addCommentDto);

    return new BaseResponse(200, '추가 완료');
  }

  @Delete('/:idx')
  @UseGuards(AuthGaurd)
  async deleteComment(
    @Param('idx') idx: number,
    @Token() user: User,
  ) {

    await this.commentService.deleteComment(idx, user);

    return new BaseResponse(200, '삭제 완료');
  }
}
