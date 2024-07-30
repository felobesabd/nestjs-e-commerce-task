import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCartDto {
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsOptional()
  user_id: number;

  @IsOptional()
  quantity: number;

  @IsOptional()
  price: number;
}