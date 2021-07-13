import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT } from 'src/config/dotenv';
import { UserRepository } from 'src/repository/user.repository';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: JWT.SECRET,
    })
  ],
  controllers: [TokenController],
  providers: [TokenService]
})
export class TokenModule { }
