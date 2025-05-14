import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Review } from "./schema/review.schema";
import { Model } from "mongoose";

@Injectable()
export class ReviewRepository {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<Review>
    ) { }

    async create(userInputs: Partial<Review>): Promise<void> {
        await this.reviewModel.create(userInputs)
    }

}