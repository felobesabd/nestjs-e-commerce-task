import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.entity";
import { CreateProdDto } from "../dtos/product/create-prod-dto";
import { UpdateProdDto } from "../dtos/product/update-prod-dto";

@Injectable()
export class ProductService {
  constructor(
    private prodRepo: ProductRepository,
  ) {}

  async create(createProdDto: CreateProdDto): Promise<Product> {
    let product;
    try {
      product = await this.prodRepo.save(createProdDto);
    } catch (e) {
      if (e.code === '23503') {
        throw new ConflictException(`Key (categoryId)=(${createProdDto.categoryId}) is not found in table "category".`)
      } else {
        throw new InternalServerErrorException();
      }
    }

    return product;
  }

  async getOne(prodId: number): Promise<Product> {
    const product = await this.prodRepo.getProductById(prodId);

    if (!product) {
      throw new NotFoundException(`Not found product by id: ${prodId}`)
    }

    return product;
  }

  async update(catId: number, updateProd: UpdateProdDto): Promise<Product> {
    const product = await this.prodRepo.updateProduct(catId, updateProd);

    const selectedCat = await this.getOne(catId);

    return selectedCat;
  }

  async delete(prodId: number): Promise<void> {
    const product = await this.prodRepo.delete({ id: prodId });
    if (product.affected === 0) {
      throw new NotFoundException(`Not found Product for this id => ${prodId}`)
    }
  }
}
