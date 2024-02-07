import { Module } from '@nestjs/common';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';
import { OrderItemsRepository } from "./order-items.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItems } from "./order-items.entity";
import { UserModule } from "../user/user.module";
import { ProductRepository } from "../product/product.repository";
import { OrdersRepository } from "../order/order.repository";

@Module({
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository, ProductRepository, OrdersRepository],
  imports: [
    TypeOrmModule.forFeature([OrderItems]),
    UserModule,
  ],

})
export class OrderItemsModule {}
