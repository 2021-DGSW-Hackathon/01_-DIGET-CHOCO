import { IsNotEmpty, IsString } from "class-validator";

export default class GetTokenDto {

  @IsString()
  @IsNotEmpty()
  code: string;
}