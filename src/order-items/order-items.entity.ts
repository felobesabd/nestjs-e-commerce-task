import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Order } from "../order/order.entity";
import { Product } from "../product/product.entity";

@Entity()
@Unique("UQ_ORDER_PRODUCT", ["item_order", "item_product"])
export class OrderItems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Order, order => order.orderItems, { eager: false, nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE" } )
  @JoinColumn({name: "item_order"})
  item_order: number;

  @ManyToOne(type => Product, prod => prod.id, { eager: true, nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE"  } )
  @JoinColumn({name: "item_product"})
  item_product: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({type: "float"})
  price: number;
}