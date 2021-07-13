import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class AddHotplaceDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  xPosition: string;

  @IsString()
  @IsNotEmpty()
  yPosition: string;

  @IsBoolean()
  @IsOptional()
  anonymous?: boolean;
}