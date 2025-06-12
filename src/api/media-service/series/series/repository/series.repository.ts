import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/service/upload.service";
import { Category } from "../../../category/entities/category.entity";
import { Director } from "../../../director/entities/director.entity";
import { Actor } from "../../../actor/entities/actor.entity";
import { Series } from "../entities/series.entity";
import { CreateSeriesOptions, ExistsSeriesOptions, FindSeriesOptions, ISeriesRepository, TExistsSeries, TFindSeries } from "./series.repository.interface";

@Injectable()
export class SeriesRepository implements ISeriesRepository {
    constructor(
        @InjectModel(Series.name) private seriesModel: Model<Series>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async exists(queryFields: Partial<ExistsSeriesOptions>): Promise<TExistsSeries> {
        return await this.seriesModel.exists(queryFields)
    }

    async create({ payload, uploadedFile }: CreateSeriesOptions): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const poster = await this.uploadService.createFile({ uploadedFile, session })
            await this.seriesModel.create([{ ...payload, poster }], { session })
        })
    }

    async find({ filter, limit, sortCriteria, startIndex }: FindSeriesOptions): Promise<TFindSeries> {
        return this.seriesModel.find(filter)
            .sort(sortCriteria)
            .skip(startIndex)
            .limit(limit)
            .select('title synopsis rate poster')
            .lean()
    }

    async findById(movieId: Types.ObjectId): Promise<Series | null> {
        return await this.seriesModel.findById(movieId)
            .populate<{ category: Category }>('category')
            .populate<{ directors: Director }>({
                path: 'directors',
                select: 'fullName awards profilePicture  knownForSeries'
            })
            .populate<{ cast: Actor }>({
                path: 'cast',
                select: 'fullName awards profilePicture knownForMovies knownForSeries'
            })
            .lean<Series | null>()
    }
}