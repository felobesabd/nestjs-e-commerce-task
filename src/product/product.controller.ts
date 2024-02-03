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

@Controller('product')
export class ProductController {
  constructor(private prodService: ProductService) {}

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.prodService.getOne(id);
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
