import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrderItemsRepository } from "./order-items.repository";
import { CreateOrderItemsDto } from "./dtos/create-order-items-dto";
import { OrderItems } from "./order-items.entity";
import { ProductRepository } from "../product/product.repository";
import { OrdersRepository } from "../order/order.repository";
import { User } from "../user/user.entity";
import { UpdateResult } from "typeorm";

@Injectable()
export class OrderItemsService {
  constructor(
    private orderItemRepo: OrderItemsRepository,
    private prodRepo: ProductRepository,
    private orderRepo: OrdersRepository,
  ) {}

  async getProduct(item_product: number) {
    // get Product
    const product = await this.prodRepo.getProductById(item_product)

    return product;
  }

  async getOrderItemForLoggedUser(orderId: number, user: User): Promise<OrderItems[]> {
    const userId = user.id;

    const orderItems = await this.orderItemRepo.getOrderItemsForLoggedUser(orderId, userId);

    if (orderItems.length === 0) {
      throw new NotFoundException(`Not found orderItems by user: ${userId}`)
    }

    return orderItems;
  }

  async getOrderItemById(orderItemId: number, user: User): Promise<OrderItems> {
    const userId = user.id;

    const orderItems = await this.orderItemRepo.getOrderItemsById(orderItemId, userId);

    if (orderItems === null) {
      throw new NotFoundException(`Not found orderItems by id: ${orderItems}`)
    }

    return orderItems;
  }

  async createOrderItems(orderItemParam: OrderItems): Promise<OrderItems> {
    const { user_id, order_id, item_product, quantity } = orderItemParam;

    // get Product
    const getProduct = await this.getProduct(item_product);

    // total Price
    const totalPrice = getProduct?.price * quantity;

    const orderItem = new OrderItems;
    orderItem.user_id = user_id;
    orderItem.order_id = order_id;
    orderItem.item_product = item_product;
    orderItem.quantity = quantity;
    orderItem.price = totalPrice;

    try {
      await this.orderItemRepo.save(orderItem);
    } catch (e) {
      console.log(e);
      if (e.code === '23505') {
        throw new BadRequestException(`Product already exists`);
        return;
      }
    }

    // Update Quantity
    const totalQuantity = getProduct?.quantity - quantity;
    if (totalQuantity < 0) {
      throw new NotFoundException(`Quantity is not available for this product`);
      return;
    }
    await this.prodRepo.updateProduct(item_product, { quantity: totalQuantity });

    return orderItem;
  }

  // async checkUserAndUpdate(orderItemId: number, orderId: number, user: User, quantity: number): Promise<UpdateResult> {
  //   const getUser = await this.getOrderItemById(orderItemId, orderId, user);
  //
  //   const item_product = getUser[0]?.item_product;
  //   // total Price
  //
  //   const getProduct = await this.getProduct(item_product);
  //
  //   // Update Quantity
  //   // 1-
  //   const backQuantity = getProduct?.quantity + getUser[0].quantity;
  //   // 2- total quantity
  //   const totalQuantity = backQuantity - quantity;
  //
  //   if (totalQuantity < 0) {
  //     throw new NotFoundException(`Quantity is not available for this product`);
  //   }
  //
  //   // total Price
  //   const totalPrice = getProduct?.price * quantity;
  //
  //   const updateQuantity = await this.orderItemRepo.updateQuantity(orderItemId, quantity, totalPrice);
  //
  //   await this.prodRepo.updateProduct(item_product, { quantity: totalQuantity });
  //
  //   console.log(updateQuantity.affected);
  //
  //   return updateQuantity;
  // }

  async deleteOneOrderItemsForUser(orderItemId: number, user: User): Promise<void> {
    await this.getOrderItemById(orderItemId, user);

    await this.orderItemRepo.deleteOneOrderItemsForUser(orderItemId);
  }

  // async deleteAllOrderItemsForUser(orderId: any, user: User): Promise<void> {
  //   await this.getOrderItemForLoggedUser(orderId, user);
  //
  //   await this.orderItemRepo.deleteِAll(orderId);
  // }


}
