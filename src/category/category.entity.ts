import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "json", nullable: true })
  name: object;

  @Column({ nullable: true })
  file: string;

  @Column()
  parent_id: number;

  @OneToMany(type => Product, prod => prod.categoryId, {eager: false} )
  cats: Product[];
}