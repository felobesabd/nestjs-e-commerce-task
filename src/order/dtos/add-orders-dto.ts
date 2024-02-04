import { IsInt, IsNotEmpty } from "class-validator";
import { User } from "../../user/user.entity";

export class AddOrdersDto {
  @IsNotEmpty()
  @IsInt()
  user: User;
}