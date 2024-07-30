import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Order } from "../order/order.entity";
import { Product } from "../product/product.entity";

@Entity()
export class OrderItems extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  order_id: number;

  @ManyToOne(type => Product, prod => prod.id, { eager: true, nullable: false, onDelete: "CASCADE", onUpdate: "CASCADE"  } )
  @JoinColumn({name: "item_product"})
  item_product: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({type: "float"})
  price: number;
}