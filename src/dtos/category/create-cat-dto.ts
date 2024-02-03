import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class catDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  file: string;

  @IsNotEmpty()
  @IsNumberString()
  parent_id: number;
}