import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { OrdersRepository } from "./order.repository";
import { Order } from "./order.entity";
import { User } from "../user/user.entity";
import { CartRepository } from "../cart/cart.repository";
import { OrderItemsRepository } from "../order-items/order-items.repository";
import { OrderItems } from "../order-items/order-items.entity";
import { OrderItemsService } from "../order-items/order-items.service";
import { ProductRepository } from "../product/product.repository";

@Injectable()
export class OrderService {
  constructor(
    private orderRepo: OrdersRepository,
    private orderItemsRepo: OrderItemsRepository,
    private cartRepo: CartRepository,
    private orderItemService: OrderItemsService,
    private prodRepo: ProductRepository,
  ) {}

  async addOrder(user: User): Promise<Order> {

    //get all carts
    let cartItems = await this.cartRepo.getAllCart(user);

    for(let cartItem of cartItems) {
      // get Product
      const getProduct = await this.prodRepo.getProductById(cartItem.productId);

      // Update Quantity
      const totalQuantity = getProduct?.quantity - cartItem.quantity;
      if (totalQuantity < 0) {
        throw new BadRequestException(`Quantity is not available for this product ${getProduct.name}`);
      } else {
        await this.prodRepo.updateProduct(cartItem.productId, { quantity: totalQuantity });
      }
    }


    let totalQuantity: number = 0;
    let totalPrice: number = 0;

    // cartItems.map(async (cartItem)=> {
    //   // totalQuantity += cartItem.quantity;
    //   // totalPrice += cartItem.price;
    //
    //   // // get Product
    //   // const getProduct = await this.prodRepo.getProductById(cartItem.productId);
    //   //
    //   // // Update Quantity
    //   // const totalQuantity = getProduct?.quantity - cartItem.quantity;
    //   // await this.prodRepo.updateProduct(cartItem.productId, { quantity: totalQuantity });
    //
    // });



    // console.log('totalQuantity ' + totalQuantity);
    // console.log('totalPrice ' + totalPrice);

    // create order
    const order = new Order;
    order.user = user;

    await this.orderRepo.save(order);

    // create orderItem
    try {
      cartItems.map(async (cartItem)=> {
        let orderItem: OrderItems = new OrderItems();
        orderItem.order_id = order.orderId;
        orderItem.user_id = user.id;
        orderItem.item_product = cartItem.productId;
        orderItem.quantity = cartItem.quantity;
        orderItem.price = cartItem.price;

        await this.orderItemsRepo.save(orderItem);
      });
    } catch (e) {
      console.log(e);
      // if (e.code === '23502') {
      //   throw new BadRequestException(`error`)
      // }
    }

    //delete cart items
    await this.cartRepo.deleteUserCart(user.id);

    delete order.user.password;
    delete order.user.salt;

    return order;
  }

  async findAllOrders(user: User): Promise<Order[] | undefined> {
    const order = await this.orderRepo.findAllOrders(user);

    if (order.length === 0) {
      throw new NotFoundException(`Not found orders for user ${user.id}`)
    }

    return order;
  }

  async getOrderById(orderId: number, user: User): Promise<Order> {
    const order = await this.orderRepo.getOrderById(orderId, user);
    if (!order) {
      throw new NotFoundException(`Not found task for this id => ${orderId}`)
    }
    return order;
  }

  async deleteOrder(orderId: number, user: User): Promise<void> {
    await this.getOrderById(orderId, user);

    const deletedOrder = await this.orderRepo.delete(orderId)

    if (deletedOrder.affected === 0) {
      throw new NotFoundException(`Not found Product for this id => ${orderId}`)
    }
  }
}
