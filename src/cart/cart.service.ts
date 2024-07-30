import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CartRepository } from "./cart.repository";
import { Cart } from "./cart.entity";
import { CreateCartDto } from "./dto/create-cart-dto";
import { User } from "../user/user.entity";
import { ProductRepository } from "../product/product.repository";
import { UpdateCartDto } from "./dto/update-cart-dto";

@Injectable()
export class CartService {
  constructor(
    private cartRepo: CartRepository,
    private prodRepo: ProductRepository,
  ) {}

  async getAllCart(user: User): Promise<Cart[]> {
    const carts = await this.cartRepo.getAllCart(user);

    if (carts.length === 0) {
      throw new NotFoundException(`Not found Cart`)
    }

    return carts;
  }

  async getTotalPrice(user: User): Promise<number> {
    const userId = user.id;
    return await this.cartRepo.getTotalPrice(userId);
  }

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const { productId, user_id, quantity } = createCartDto;

    const getProduct = await this.prodRepo.getProductById(productId);

    let cart = new Cart;
    cart.productId = productId;
    cart.user_id = user_id;
    cart.quantity = quantity;
    cart.price = getProduct.price;

    try {
      await this.cartRepo.save(cart);
    } catch (e) {
      if (e.code === "23505") {
        throw new BadRequestException('Product already exists');
      }
    }

    return cart;
  }

  async updateCart(cartId: number, updateCart: UpdateCartDto): Promise<Cart> {
    const getProduct = await this.prodRepo.getProductById(updateCart.productId);
    const totalPrice = updateCart.quantity * getProduct.price;

    await this.cartRepo.updateCart(cartId, { quantity: updateCart.quantity, price: totalPrice });

    const cart = await this.cartRepo.getOneCart(cartId);

    return cart;
  }

  async deleteOneFromCart(cartId: number, user: User): Promise<void> {
    await this.cartRepo.deleteOneFromCart(cartId, user.id);
  }
}
