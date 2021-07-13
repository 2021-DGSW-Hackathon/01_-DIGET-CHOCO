import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class AddCommentDto {

  @IsNumber()
  @IsNotEmpty()
  star: number;

  @IsOptional()
  comment?: string;

  @IsBoolean()
  @IsOptional()
  anonymous: boolean;
}