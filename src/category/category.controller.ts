import {
  BadRequestException,
  Body,
  Controller, Delete, Get, HttpCode, HttpStatus, Inject, Injectable, Param,
  ParseIntPipe, Patch,
  Post,
  Req, Scope,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { catDto } from "../dtos/category/create-cat-dto";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer'
import { v4 as uuid } from 'uuid';
import { localOpts } from "../config/multer.config";
import { UpdateResult } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from 'express';

@Controller('category')
@Injectable({ scope: Scope.REQUEST })
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.categoryService.lang = this.request.header('Accept-Language');
  }

  @Get('')
  getAll(@Req() req: any): Promise<Category[]> {
    console.log(req);
    return this.categoryService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', localOpts))
  create(@Body() createCatDto: catDto, @UploadedFile() file: Express.Multer.File, @Req() req: any): Promise<Category> {

    if (!file) {
      throw new BadRequestException('file is not a image')
    }

    createCatDto.file = file ? file.filename : '';
    // const imagePath = `${file.filename}`
    // req.body.file = file ? file.filename : '';

    return this.categoryService.createCategory(createCatDto);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file', localOpts))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: catDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Category> {
    if (file) {
      updateDto.file = file.filename;
    } else if (!file) {
      throw new BadRequestException('file is not a image')
    }

    return this.categoryService.update(id, updateDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCat(id);
  }
}
