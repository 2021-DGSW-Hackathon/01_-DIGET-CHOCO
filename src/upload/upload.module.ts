import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
