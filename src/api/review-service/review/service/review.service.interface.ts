import { Request } from "express";
import { CreateReviewDto } from "../dto/create-review.dto";
import { PopulatedReview } from "../repository/review.repository.interface";
import { PartialGetReviewDto } from "../dto/get-review.dto";

export interface AddReviewParams {
    payload: CreateReviewDto;
    req: Request;
}
export interface IReviewService {
    addReview(params: AddReviewParams): Promise<string>;
    getAllReviews(queryFields: PartialGetReviewDto): Promise<PopulatedReview[]>;
}