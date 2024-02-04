import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Order } from "../order/order.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @OneToMany(type => Order, order => order.user, {eager: false} )
  orders: Order[];

  async validationPass(password: string): Promise<Boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}