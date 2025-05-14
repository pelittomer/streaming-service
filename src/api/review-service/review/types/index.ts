import { Types } from "mongoose";
import { Role } from "src/common/types";
import { Review } from "../schema/review.schema";

interface User {
    _id: Types.ObjectId;
    username: string;
    roles: Role;
}
export interface PopulatedReview extends Omit<Review, 'user'> {
    user: Pick<User, 'username' | 'roles'>;
}