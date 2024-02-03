import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from "./category.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  imports: [
    TypeOrmModule.forFeature([Category]),
  ]
})
export class CategoryModule {}
