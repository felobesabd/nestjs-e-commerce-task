import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(type => User, user => user.id, {eager: false} )
  user: User;

  @Column()
  userId: number;
}