import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { OrderItems } from "../order-items/order-items.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(type => User, user => user.id, {eager: false} )
  user: User;

  @Column()
  userId: number;

  @OneToMany(type => OrderItems, orderItem => orderItem.id, {eager: false} )
  orderItems: OrderItems[];
}