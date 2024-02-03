import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProdDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  categoryId: any;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  price: number;
}