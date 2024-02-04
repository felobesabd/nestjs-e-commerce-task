import { Injectable, NotFoundException } from "@nestjs/common";
import { OrdersRepository } from "./order.repository";
import { Order } from "./order.entity";
import { User } from "../user/user.entity";

@Injectable()
export class OrderService {
  constructor(private orderRepo: OrdersRepository) {}

  async addOrder(user: User): Promise<Order> {
    const order = new Order;
    order.user = user;

    await this.orderRepo.save(order);
    delete order.user.password;
    delete order.user.salt;

    return order;
  }

  async findAllOrders(user: User): Promise<Order[] | undefined> {
    const order = await this.orderRepo.findAllOrders(user);

    if (!order) {
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
