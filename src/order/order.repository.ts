import { Injectable } from "@nestjs/common";
import { DataSource, Repository} from "typeorm";
import { Order } from "./order.entity";
import { User } from "../user/user.entity";

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async findAllOrders(user: User): Promise<Order[]> {
    const order = await this.findBy({ userId: user.id  });
    return order;
  }

  async getOrderById(orderId: number, user: User): Promise<Order> {
    const order = await this.findOne({ where: { orderId: orderId, userId: user.id } } )
    return order;
  }
}