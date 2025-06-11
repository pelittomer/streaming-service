import { User } from "src/api/user-service/user/entities/user.entity";
import { Review } from "../schema/review.schema";

export interface PopulatedReview extends Omit<Review, 'user'> {
    user: Pick<User, 'username' | 'roles'>;
}
export interface IReviewRepository {
    create(payload: Partial<Review>): Promise<void>;
    find(queryFields: Partial<Review>): Promise<PopulatedReview[]>;
}