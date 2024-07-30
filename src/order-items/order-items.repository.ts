import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { OrderItems } from "./order-items.entity";

@Injectable()
export class OrderItemsRepository extends Repository<OrderItems> {
  constructor(private dataSource: DataSource) {
    super(OrderItems, dataSource.createEntityManager());
  }

  async getOrderItemsById(orderItemsId: number, userId: number): Promise<OrderItems> {
    return await this.findOne({ where: { id: orderItemsId, user_id: userId }});
  }

  async getOrderItemsForLoggedUser(orderId: number, userId: number): Promise<OrderItems[]> {
    return await this.findBy({ order_id: orderId, user_id: userId });
  }

  async updateQuantity(orderItemsId: number, quantity: number, price: number): Promise<UpdateResult> {
    const orderItems = await this.update(orderItemsId, { price, quantity })
    return orderItems;
  }

  async deleteOneOrderItemsForUser(orderItemsId: number): Promise<void> {
    const deletedOrder = await this.delete({ id: orderItemsId })

    if (deletedOrder.affected === 0) {
      throw new NotFoundException(`Not found Product for this id => ${orderItemsId}`)
    }
  }

  // async deleteِAll(orderId: any): Promise<void> {
  //   const deletedOrder = await this.delete({item_order: orderId})
  //
  //   if (deletedOrder.affected === 0) {
  //     throw new NotFoundException(`Not found OrderItems for this id => ${orderId}`)
  //   }
  // }
}