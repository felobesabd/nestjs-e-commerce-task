import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { AuthGuard } from "@nestjs/passport";
import { AddWishlistDto } from "./dtos/add-wishlist-dto";
import { GetUser } from "../user/get-user-decorator";
import { User } from "../user/user.entity";
import { Wishlist } from "./wishlist.entity";

@Controller('wishlist')
@UseGuards(AuthGuard())
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  getWishlists(@GetUser() user: User) {
    return this.wishlistService.findAllWishlistByUser(user);
  }

  @Get('/:id')
  getWishlist(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.wishlistService.findOneWishlistByUser(id, user);
  }

  @Post()
  async addWishlist(@Body() addWishlistDto: AddWishlistDto, @GetUser() user: User): Promise<Wishlist> {
    if (user) {
      addWishlistDto.wishlist_user = user.id;
    }
    return this.wishlistService.addWishlist(addWishlistDto)
  }

  @Delete('/:id')
  deleteWishlist(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.wishlistService.deleteWishlistByUser(id, user);
  }
}
