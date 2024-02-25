import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { WishlistRepository } from "./wishlist.repository";
import { AddWishlistDto } from "./dtos/add-wishlist-dto";
import { Wishlist } from "./wishlist.entity";
import { User } from "../user/user.entity";
import { CustomI18nService } from "../shared/i18n-service/custom-i18n-service";

@Injectable()
export class WishlistService {
  constructor(
    private wishlistRepo: WishlistRepository,
    private i18nService: CustomI18nService
  ) {}

  async findAllWishlistByUser(user: User): Promise<Wishlist[]> {
    const userId = user.id;
    const wishlists = await this.wishlistRepo.findAllWishlistByUser(userId);

    if (wishlists.length === 0) {
      throw new NotFoundException(this.i18nService.translate('events.HELLO'));
    }

    return wishlists;
  }

  async findOneWishlistByUser(wishlistId: number, user: User): Promise<Wishlist | null> {
    const userId = user.id;
    const wishlist = await this.wishlistRepo.findOneWishlistByUser(wishlistId, userId);

    if (!wishlist) {
      throw new NotFoundException(`Not found wishlist by user = ${user?.username}`);
    }

    return wishlist;
  }


  async addWishlist(addWishlistDto: AddWishlistDto): Promise<Wishlist> {
    let wishlist;
    try {
      wishlist = await this.wishlistRepo.addWishlist(addWishlistDto);
    } catch (e) {
      console.log(e);
      if (e.code === '23505') {
        throw new BadRequestException(`wishlist_product = ${addWishlistDto.wishlist_product} already exists.`)
      }
    }

    return wishlist;
  }

  async deleteWishlistByUser(prodId: number, user: User): Promise<void> {
    const userId = user.id;
    await this.wishlistRepo.deleteWishlistByUser(prodId, userId);
  }
}
