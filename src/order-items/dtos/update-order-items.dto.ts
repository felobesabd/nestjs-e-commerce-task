import { IsInt } from "class-validator";

export class UpdateOrderItemsDto {
  @IsInt()
  quantity: number;

  @IsInt()
  price: number;
}