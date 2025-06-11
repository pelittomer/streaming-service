import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Review } from "./schema/review.schema";
import { Model } from "mongoose";
import { User } from "src/api/user-service/user/entities/user.entity";

export interface PopulatedReview extends Omit<Review, 'user'> {
    user: Pick<User, 'username' | 'roles'>;
}

@Injectable()
export class ReviewRepository {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<Review>
    ) { }

    async create(userInputs: Partial<Review>): Promise<void> {
        await this.reviewModel.create(userInputs)
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