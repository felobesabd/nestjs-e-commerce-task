import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique("UQ_USER_PRODUCT", ["wishlist_user", "wishlist_product"])
export class Wishlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  wishlist_id: number;

  @Column()
  wishlist_user: number;

  @Column()
  wishlist_product: number;
}