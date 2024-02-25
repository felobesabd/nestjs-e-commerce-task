import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class catDto {
  @IsNotEmpty()
  name: object;

  @IsOptional()
  file: string;

  @IsNotEmpty()
  @IsNumberString()
  parent_id: number;
}