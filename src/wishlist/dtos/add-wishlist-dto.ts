import { IsInt, IsNotEmpty } from "class-validator";

export class AddWishlistDto {
  wishlist_user: number;

  @IsNotEmpty()
  @IsInt()
  wishlist_product: number;
}