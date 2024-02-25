import { IsInt, IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class AddWishlistDto {
  wishlist_user: number;

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsInt({ message: i18nValidationMessage('validation.IS_INT') })
  wishlist_product: number;
}