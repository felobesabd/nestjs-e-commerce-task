import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource, EntityManager, Repository, UpdateResult } from "typeorm";
import { Product } from "./product.entity";
import { UpdateProdDto } from "../dtos/product/update-prod-dto";

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async rawQuery<T = any[]>(query: string, parameters: object = {}, manager?: EntityManager): Promise<T> {
    const conn = this.manager.connection;
    const [ escapedQuery, escapedParams ] = conn.driver.escapeQueryWithParameters(query, parameters, {});
    return conn.query(escapedQuery, escapedParams);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.find();
  }

  async getProductById(prodId: number): Promise<Product> {
    return await this.findOne({ where: { id: prodId } });
  }

  async getProductsForCategory(catId: number): Promise<Product[]> {
    const products = await
      this.rawQuery<Product[]>(`
            SELECT 
            "product".* 
            FROM "product" 
            inner join "category" on "category".id = "product"."categoryId"
            where 
                "category".id = :catId
      `,{
            catId: catId
        }
      );

    console.log(products);

    return products;
  }

  async updateProduct(prodId: number, updateProd: UpdateProdDto): Promise<UpdateResult> {
    return await this.update(prodId, updateProd);
  }

}