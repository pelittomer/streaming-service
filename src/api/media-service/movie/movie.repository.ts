import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Movie, MovieDocument } from "./schemas/movie.schema";
import { Model } from "mongoose";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UploadService } from "src/api/upload-service/upload/upload.service";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";


@Injectable()
export class MovieRepository {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<Movie>,
        private readonly uploadService: UploadService,
        private readonly sharedUtilsService: SharedUtilsService,
    ) { }

    async exists(queryFields: Partial<Movie>): Promise<Pick<MovieDocument, '_id'> | null> {
        return await this.movieModel.exists(queryFields)
    }

    async create(userInputs: CreateMovieDto, uploadedFile: Express.Multer.File): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const posterId = await this.uploadService.createImage(uploadedFile, session)
            await this.movieModel.create({
                ...userInputs,
                poster: posterId
            })
        })
    }
    async find(limit: number, startIndex: number, filter: any, sortCriteria: any): Promise<Pick<MovieDocument, '_id' | 'title' | 'synopsis' | 'rate' | 'poster'>[]> {
        return this.movieModel.find(filter)
            .sort(sortCriteria)
            .skip(startIndex)
            .limit(limit)
            .select('title synopsis rate poster')
            .lean()
    }
}