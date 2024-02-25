import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from "./wishlist.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wishlist } from "./wishlist.entity";
import { UserModule } from "../user/user.module";
import { CustomI18nService } from "../shared/i18n-service/custom-i18n-service";

@Module({
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository, CustomI18nService],
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    UserModule,
  ]
})
export class WishlistModule {}
