import { BadRequestException, ForbiddenException, GoneException, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import { ENDPOINT, CLIENT } from "src/config/dotenv";

export const getToken = async (code: string) => {
  try {

    const { data } = await axios.post(`${ENDPOINT.DAUTH}/token`, {
      code,
      clientId: CLIENT.ID,
      clientSecret: CLIENT.SECRET,
    });

    return data.data;
  } catch (err) {

    if (err.response !== undefined) {
      switch (err.response.status) {
        case 400:
          throw new BadRequestException('검증 오류 (잘못된 형식입니다)');

        case 401:
          throw new UnauthorizedException('잘못된 clientSecret입니다');

        case 403:
          throw new ForbiddenException('변조된 code입니다');

        case 410:
          throw new GoneException('토큰이 만료되었습니다');

        case 500:
          throw new InternalServerErrorException('Dauth 서버 오류');

        default:
          Logger.error(err);
          throw new InternalServerErrorException('서버 오류');
      }
    }

    Logger.error(err);
    throw new InternalServerErrorException('서버 오류');
  }
}