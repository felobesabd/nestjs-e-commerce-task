import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe, Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart-dto";
import { Cart } from "./cart.entity";
import { GetUser } from "../user/get-user-decorator";
import { User } from "../user/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { UpdateCartDto } from "./dto/update-cart-dto";

@Controller('cart')
@UseGuards(AuthGuard())
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getAllCart(@GetUser() user: User): Promise<Cart[]> {
    return this.cartService.getAllCart(user);
  }

  @Get('/totalPrice')
  getTotalPrice(@GetUser() user: User): Promise<number> {
    return this.cartService.getTotalPrice(user);
  }

  @Post()
  createCart(@Body() createCart: CreateCartDto, @GetUser() user: User): Promise<Cart> {
    createCart.user_id = user.id;
    return this.cartService.createCart(createCart);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartDto: UpdateCartDto): Promise<Cart> {
    return this.cartService.updateCart(id, updateCartDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOneOrderItemsForUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.cartService.deleteOneFromCart(id, user);
  }
}
