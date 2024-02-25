import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Wishlist } from "./wishlist.entity";
import { AddWishlistDto } from "./dtos/add-wishlist-dto";

@Injectable()
export class WishlistRepository extends Repository<Wishlist> {
  constructor(private dataSource: DataSource) {
    super(Wishlist, dataSource.createEntityManager());
  }

  async addWishlist(addWishlistDto: AddWishlistDto): Promise<Wishlist> {
    const wishlist = await this.save(addWishlistDto);

    return wishlist;
  }

  async findAllWishlistByUser(userId: number): Promise<Wishlist[]> {
    const wishlists = await this.find({ where: { wishlist_user: userId }});

    return wishlists;
  }

  async findOneWishlistByUser(wishlistId: number, userId: number): Promise<Wishlist | null> {
    const wishlist = await this.findOne({ where: { wishlist_id: wishlistId, wishlist_user: userId }});

    return wishlist;
  }

  async deleteWishlistByUser(prodId: number, userId: number): Promise<void> {
    const wishlist = await this.delete({ wishlist_product: prodId, wishlist_user: userId });

    if (wishlist.affected === 0) {
      throw new NotFoundException(`Not found wishlist for this id => ${prodId}`)
    }
  }
}