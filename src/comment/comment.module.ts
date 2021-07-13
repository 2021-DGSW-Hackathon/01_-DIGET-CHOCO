import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotplaceService } from 'src/hotplace/hotplace.service';
import CommentRepository from 'src/repository/comment.repository';
import { HotpalceRepository } from 'src/repository/hotplace.repository';
import { UserModule } from 'src/user/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository, HotpalceRepository]),
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, HotplaceService]
})
export class CommentModule { }
