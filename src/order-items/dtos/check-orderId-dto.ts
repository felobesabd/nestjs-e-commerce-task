import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CheckOrderIdDto {
  @IsNotEmpty()
  @IsInt()
  order_id: number;
}