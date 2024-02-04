import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrdersRepository } from "./order.repository";
import { Order } from "./order.entity";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrdersRepository],
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule,
  ],
})
export class OrderModule {}
