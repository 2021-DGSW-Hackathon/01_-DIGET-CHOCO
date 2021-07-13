import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotpalceRepository } from 'src/repository/hotplace.repository';
import { UserRepository } from 'src/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { HotplaceController } from './hotplace.controller';
import { HotplaceService } from './hotplace.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, HotpalceRepository]),
    UserModule,
  ],
  controllers: [HotplaceController],
  providers: [HotplaceService],
  exports: [HotplaceService]
})
export class HotplaceModule { }
