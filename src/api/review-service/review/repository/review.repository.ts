import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Review } from "../schema/review.schema";
import { Model } from "mongoose";
import { User } from "src/api/user-service/user/entities/user.entity";
import { IReviewRepository, PopulatedReview } from "./review.repository.interface";

@Injectable()
export class ReviewRepository implements IReviewRepository {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<Review>
    ) { }

    async create(payload: Partial<Review>): Promise<void> {
        await this.reviewModel.create(payload)
    }

    async find(queryFields: Partial<Review>): Promise<PopulatedReview[]> {
        return await this.reviewModel.find(queryFields)
            .select<Pick<Review, 'comment' | 'user' | 'blur'>>('comment user blur')
            .populate<{ user: Pick<User, 'username' | 'roles'> }>({
                path: 'user',
                select: 'username roles',
            }).lean()
    }
}