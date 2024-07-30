import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { OrderService } from "./order.service";
import { AddOrdersDto } from "./dtos/add-orders-dto";
import { Order } from "./order.entity";
import { GetUser } from "../user/get-user-decorator";
import { User } from "../user/user.entity";

@Controller('order')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  get(@GetUser() user: User) {
    return this.orderService.findAllOrders(user);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Order> {
    return this.orderService.getOrderById(id, user);
  }

  @Post()
  addOrder(@GetUser() user: User) {
    return this.orderService.addOrder(user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOrder(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.orderService.deleteOrder(id, user);
  }
}
