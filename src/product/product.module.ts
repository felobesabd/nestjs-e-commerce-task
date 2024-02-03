import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from "./product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  imports: [
    TypeOrmModule.forFeature([Product]),
  ]
})
export class ProductModule {}
