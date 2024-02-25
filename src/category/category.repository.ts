import { DataSource, Repository, UpdateResult } from "typeorm";
import { Category } from "./category.entity";
import { Injectable } from "@nestjs/common";
import { catDto } from "../dtos/category/create-cat-dto";

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async getAllCategory(): Promise<Category[]> {
    const category = await this.find();
    return category;
  }

  async getCategoryById(catId: number): Promise<Category> {
    const category = await this.findOne({ where: { id: catId } });
    return category;
  }

  async updateCategory(catId: number, updateCat: catDto): Promise<UpdateResult> {
    const category = await this.update(catId, updateCat);
    return category;
  }

}