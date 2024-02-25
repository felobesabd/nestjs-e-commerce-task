import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get, HttpCode, HttpStatus,
  Param,
  ParseIntPipe, Patch,
  Post,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProdDto } from "../dtos/product/create-prod-dto";
import { UpdateProdDto } from "../dtos/product/update-prod-dto";
import { Category } from "../category/category.entity";

@Controller('product')
export class ProductController {
  constructor(private prodService: ProductService) {}

  @Get('')
  getAllProducts(): Promise<Product[]> {
    return this.prodService.getAllProducts();
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.prodService.getOne(id);
  }

  @Get('/category/:categoryId')
  getProductsForCategory(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<Product[]> {
    console.log(categoryId);
    return this.prodService.getProductsForCategory(categoryId);
  }

  @Post()
  create(@Body() createProdDto: CreateProdDto): Promise<Product> {
    return this.prodService.create(createProdDto);
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateProdDto): Promise<Product> {
    return this.prodService.update(id, updateDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.prodService.delete(id);
  }
}
