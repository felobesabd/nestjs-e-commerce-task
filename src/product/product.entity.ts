import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Category, cat => cat.cats, {eager: true} )
  @JoinColumn({name: "categoryId"})
  categoryId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;
}