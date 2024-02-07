import { IsInt, IsNotEmpty } from "class-validator";

export class CreateOrderItemsDto {
  @IsNotEmpty()
  @IsInt()
  item_order: number;

  @IsNotEmpty()
  @IsInt()
  item_product: number;

  @IsInt()
  quantity: number;
}