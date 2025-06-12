import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Movie } from "../entities/movie.entity";
import { Model, Types } from "mongoose";
import { UploadService } from "src/api/upload-service/upload/service/upload.service";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { Category } from "../../category/entities/category.entity";
import { Director } from "../../director/entities/director.entity";
import { Actor } from "../../actor/entities/actor.entity";
import { CreateMovieOptions, ExistsMovieOptions, FindMovieOptions, IMovieRepository, TExistsMovie, TFindMovie } from "./movie.repository.interface";

@Injectable()
export class MovieRepository implements IMovieRepository {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<Movie>,
        private readonly uploadService: UploadService,
        private readonly sharedUtilsService: SharedUtilsService,
    ) { }

    async exists(queryFields: Partial<ExistsMovieOptions>): Promise<TExistsMovie> {
        return await this.movieModel.exists(queryFields)
    }

    async create({ payload, uploadedFile }: CreateMovieOptions): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const posterId = await this.uploadService.createFile({uploadedFile, session})
            await this.movieModel.create({
                ...payload,
                poster: posterId
            })
        })
    }

    async find({ filter, limit, sortCriteria, startIndex }: FindMovieOptions): Promise<TFindMovie> {
        return this.movieModel.find(filter)
            .sort(sortCriteria)
            .skip(startIndex)
            .limit(limit)
            .select('title synopsis rate poster')
            .lean()
    }

    async findById(movieId: Types.ObjectId): Promise<Movie | null> {
        return await this.movieModel.findById(movieId)
            .populate<{ category: Category }>('category')
            .populate<{ directors: Director }>({
                path: 'directors',
                select: 'fullName awards profilePicture  knownForSeries'
            })
            .populate<{ cast: Actor }>({
                path: 'cast',
                select: 'fullName awards profilePicture knownForMovies knownForSeries'
            })
            .lean<Movie | null>()
    }
}