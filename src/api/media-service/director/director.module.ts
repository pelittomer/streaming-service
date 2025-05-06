import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { DirectorRepository } from './director.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './schemas/director.schema';

@Module({
  controllers: [DirectorController],
  providers: [DirectorService, DirectorRepository],
  imports: [
    MongooseModule.forFeature([{ name: Director.name, schema: DirectorSchema }])
  ]
})
export class DirectorModule { }
