import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
@Unique("UQ_CART_USER_PRODUCT", ["user_id", "productId"])
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(type => Product, prod => prod.id, {eager: true} )
  product: Product[];

  @Column()
  productId: number;

  @Column({default: 1})
  quantity: number;

  @Column()
  price: number;
}