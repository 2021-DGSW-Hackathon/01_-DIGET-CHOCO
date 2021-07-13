import { Injectable } from '@nestjs/common';
import { HotpalceRepository } from 'src/repository/hotplace.repository';
import AddHotplaceDto from './dto/addHotplace.dto';

@Injectable()
export class HotplaceService {

  constructor(
    private readonly hotpalceRepository: HotpalceRepository,
  ) { }

  async addHotplace(addHotplaceDto: AddHotplaceDto) {


  }
}
