import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrdersRepository } from "./order.repository";
import { Order } from "./order.entity";
import { UserModule } from "../user/user.module";
import { OrderItemsRepository } from "../order-items/order-items.repository";
import { CartRepository } from "../cart/cart.repository";
import { OrderItemsModule } from "../order-items/order-items.module";
import { OrderItemsService } from "../order-items/order-items.service";
import { ProductRepository } from "../product/product.repository";

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrdersRepository, OrderItemsRepository, CartRepository, OrderItemsService, ProductRepository],
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule,
  ],
})
export class OrderModule {}
