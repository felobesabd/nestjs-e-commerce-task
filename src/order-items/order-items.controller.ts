import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { OrderItemsService } from "./order-items.service";
import { CreateOrderItemsDto } from "./dtos/create-order-items-dto";
import { OrderItems } from "./order-items.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../user/get-user-decorator";
import { User } from "../user/user.entity";
import { UpdateResult } from "typeorm";

@Controller('orderItems')
@UseGuards(AuthGuard())
export class OrderItemsController {
  constructor(private orderItemService: OrderItemsService) {}

  @Get('')
  getOrderItems(@Body() orderId: any, @GetUser() user: User): Promise<OrderItems[]> {
    orderId = orderId?.orderId;
    return this.orderItemService.getOrderItemForLoggedUser(orderId, user);
  }

  @Get('/:id')
  getOrderItemsById(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderId: any,
    @GetUser() user: User
  ): Promise<OrderItems[]> {
    orderId = orderId?.orderId;
    return this.orderItemService.getOrderItemById(id, orderId, user);
  }

  @Post()
  create(@Body() createItemsDto: CreateOrderItemsDto, @GetUser() user: User): Promise<OrderItems> {
    return this.orderItemService.createOrderItems(createItemsDto, user)
  }

  @Patch('/:id')
  checkUserAndUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderId: any,
    @GetUser() user: User,
    @Body() quantity: any,
  ): Promise<UpdateResult> {
    orderId = orderId?.orderId;
    quantity = quantity?.quantity;
    return this.orderItemService.checkUserAndUpdate(id, orderId, user, quantity);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOneOrderItemsForUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderId: any,
    @GetUser() user: User
  ): Promise<void> {
    orderId = orderId?.orderId;
    return this.orderItemService.deleteOneOrderItemsForUser(id, orderId, user);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAllOrderItemsForUser(@Body() orderId: any, @GetUser() user: User): Promise<void> {
    orderId = orderId?.orderId;
    return this.orderItemService.deleteAllOrderItemsForUser(orderId, user);
  }
}