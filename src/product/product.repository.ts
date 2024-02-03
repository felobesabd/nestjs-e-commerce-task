import { Injectable } from "@nestjs/common";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { Product } from "./product.entity";
import { UpdateProdDto } from "../dtos/product/update-prod-dto";

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async getProductById(prodId: number): Promise<Product> {
    const Product = await this.findOne({ where: { id: prodId } });
    return Product;
  }

  async updateProduct(prodId: number, updateProd: UpdateProdDto): Promise<UpdateResult> {
    const Product = await this.update(prodId, updateProd);
    return Product;
  }

}