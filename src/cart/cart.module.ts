import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartController } from "./cart.controller";
import { CartRepository } from "./cart.repository";
import { Cart } from "./cart.entity";
import { UserModule } from "../user/user.module";
import { ProductRepository } from "../product/product.repository";

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository, ProductRepository],
  imports: [
    TypeOrmModule.forFeature([Cart]),
    UserModule,
  ]
})
export class CartModule {}
