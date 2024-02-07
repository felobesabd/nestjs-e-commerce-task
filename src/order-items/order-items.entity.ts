import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";
import { Product } from "../product/product.entity";

@Entity()
export class OrderItems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Order, order => order.orderId, { eager: false, nullable: false } )
  @JoinColumn({name: "itemOrderId"})
  item_order: number;

  @ManyToOne(type => Product, prod => prod.id, { eager: false, nullable: false } )
  @JoinColumn({name: "item_product"})
  item_product: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({type: "float"})
  price: number;
}