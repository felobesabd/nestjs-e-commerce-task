import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from "./category.repository";
import { catDto } from "../dtos/category/create-cat-dto";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepo: CategoryRepository,
  ) {}

  async getAll(): Promise<Category[]> {
    const cats = await this.categoryRepo.getAllCategory();

    if (cats.length === 0) {
      throw new NotFoundException(`Not found Categories`)
    }

    return cats;
  }

  async createCategory(createCatDto: catDto): Promise<Category> {
    const category = await this.categoryRepo.save(createCatDto)

    // console.log(req.body);
    return category;
  }

  async getOne(catId: number): Promise<Category> {
    const cat = await this.categoryRepo.getCategoryById(catId);

    if (!cat) {
      throw new NotFoundException(`Not found Category by id: ${catId}`)
    }

    return cat;
  }

  async update(catId: number, updateCat: catDto): Promise<Category> {
    const category = await this.categoryRepo.updateCategory(catId, updateCat);

    const selectedCat = await this.getOne(catId);

    return selectedCat;
  }

  async deleteCat(catId: number): Promise<void> {
    const task = await this.categoryRepo.delete({ id: catId });
    if (task.affected === 0) {
      throw new NotFoundException(`Not found task for this id => ${catId}`)
    }
  }

}
