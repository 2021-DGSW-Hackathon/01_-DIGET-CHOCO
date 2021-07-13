import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommentRepository from 'src/repository/comment.repository';
import { UserModule } from 'src/user/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
