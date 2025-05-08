import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  addCategory() {
    //Adds a new category to the database.
  }

  @Get()
  getAllCategories() {
    //Retrieves a list of all available categories.
  }

}
