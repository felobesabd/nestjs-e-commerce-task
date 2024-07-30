import {
  BadRequestException,
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
import { CheckOrderIdDto } from "./dtos/check-orderId-dto";

@Controller('orderItems')
@UseGuards(AuthGuard())
export class OrderItemsController {
  constructor(private orderItemService: OrderItemsService) {}

  @Get('/all/:order_id')
  getOrderItems(@Param("order_id", ParseIntPipe) order_id: number, @GetUser() user: User): Promise<OrderItems[]> {
    console.log('item_orderId ' + order_id);
    // console.log('item_orderId ' + order_id.orderId);
    // const order: number = order_id.order_id;
    return this.orderItemService.getOrderItemForLoggedUser(order_id, user);
  }

  @Get('/specific/:id')
  getOrderItemsById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<OrderItems> {
    return this.orderItemService.getOrderItemById(id, user);
  }

  // @Post()
  // create(@Body() createItemsDto: CreateOrderItemsDto, @GetUser() user: User): Promise<OrderItems> {
  //   createItemsDto.user_id = user.id;
  //   return this.orderItemService.createOrderItems(createItemsDto)
  // }

  // @Patch('/:id')
  // checkUserAndUpdate(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() orderId: any,
  //   @GetUser() user: User,
  //   @Body() quantity: any,
  // ): Promise<UpdateResult> {
  //   orderId = orderId?.orderId;
  //   quantity = quantity?.quantity;
  //   return this.orderItemService.checkUserAndUpdate(id, orderId, user, quantity);
  // }

  @Delete('/specific/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOneOrderItemsForUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.orderItemService.deleteOneOrderItemsForUser(id, user);
  }

  // @Delete()
  // @HttpCode(HttpStatus.NO_CONTENT)
  // deleteAllOrderItemsForUser(@Body() orderId: any, @GetUser() user: User): Promise<void> {
  //   orderId = orderId?.orderId;
  //   return this.orderItemService.deleteAllOrderItemsForUser(orderId, user);
  // }
}