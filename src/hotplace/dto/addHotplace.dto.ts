import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class AddHotplaceDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  discript: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  xPosition: string;

  @IsString()
  @IsNotEmpty()
  yPosition: string;

  @IsOptional()
  anonymous?: boolean;
}