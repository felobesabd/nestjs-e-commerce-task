import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
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