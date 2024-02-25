import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, EntityManager, Repository, UpdateResult } from "typeorm";
import { OrderItems } from "./order-items.entity";

@Injectable()
export class OrderItemsRepository extends Repository<OrderItems> {
  constructor(private dataSource: DataSource) {
    super(OrderItems, dataSource.createEntityManager());
  }

  async rawQuery<T = any[]>(query: string, parameters: object = {}, manager?: EntityManager): Promise<T> {
    const conn = this.manager.connection;
    const [ escapedQuery, escapedParams ] = conn.driver.escapeQueryWithParameters(query, parameters, {});
    return conn.query(escapedQuery, escapedParams);
  }

  async getOrderItemsById(orderItemsId: number, orderId: number, userId: number): Promise<OrderItems[]> {
    const orderItems = await
      this.rawQuery<OrderItems[]>(`
            SELECT 
            "order_items".* 
            FROM "user" 
            INNER JOIN "order" ON "order"."userId" = "user".id  
            INNER JOIN "order_items" ON "order_items"."itemOrderId" = "order"."orderId" 
            where 
                "order"."orderId" = :orderId AND 
                "user".id = :user AND
                "order_items".id = :order_item
      `,{
        orderId: orderId,
        user: userId,
        order_item: orderItemsId,
      }
    );

    return orderItems;
  }

  async getOrderItemsForLoggedUser(orderId: number, userId: number): Promise<OrderItems[]> {
    const orderItems = await
      this.rawQuery<OrderItems[]>(`
           SELECT 
            "order_items".* 
            FROM "user" 
            INNER JOIN "order" ON "order"."userId" = "user".id  
            INNER JOIN "order_items" ON "order_items"."item_order" = "order"."orderId" 
            where 
                "order"."orderId" = :orderId AND 
                "user".id = :user
      `,{
          orderId: orderId,
          user: userId,
        }
      );

    return orderItems;
  }

  async updateQuantity(orderItemsId: number, quantity: number, price: number): Promise<UpdateResult> {
    const orderItems = await this.update(orderItemsId, { price, quantity })
    return orderItems;
  }

  async deleteOneOrderItemsForUser(orderItemsId: number): Promise<void> {
    const deletedOrder = await this.delete(orderItemsId)

    if (deletedOrder.affected === 0) {
      throw new NotFoundException(`Not found Product for this id => ${orderItemsId}`)
    }
  }

  async deleteِAll(orderId: any): Promise<void> {
    const deletedOrder = await this.delete({item_order: orderId})

    if (deletedOrder.affected === 0) {
      throw new NotFoundException(`Not found OrderItems for this id => ${orderId}`)
    }
  }
}