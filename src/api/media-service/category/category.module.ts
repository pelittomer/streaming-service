import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoryUtilsService } from './utils/category-utils.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  exports: [CategoryRepository]
})
export class CategoryModule { }
