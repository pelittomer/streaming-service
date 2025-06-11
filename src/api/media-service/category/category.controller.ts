import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Role } from 'src/api/user-service/user/entities/types';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  addCategory(
    @Body() payload: CreateCategoryDto
  ) {
    return this.categoryService.addCategory(payload)
  }

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories()
  }
}
