import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from "./wishlist.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wishlist } from "./wishlist.entity";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository],
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    UserModule,
  ]
})
export class WishlistModule {}
