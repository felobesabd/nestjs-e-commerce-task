import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateOrderItemsDto {
  @IsOptional()
  user_id: number;

  @IsNotEmpty()
  @IsInt()
  item_product: number;

  @IsInt()
  quantity: number;
}