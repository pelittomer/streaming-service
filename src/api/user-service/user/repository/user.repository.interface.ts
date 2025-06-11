import { Types } from "mongoose"
import { UserDocument } from "../entities/types"
import { User } from "../entities/user.entity"

export type UserCreationInput = Pick<User, 'username' | 'email' | 'password'>
export type UserIdentifierQuery = Partial<Pick<User, 'email' | 'username'>>
export type UserWithoutSensitiveInfo = Omit<UserDocument, 'emailVerificationToken' | 'password'>

export interface IUserRepository {
    findByOrQuery(queryFields: Partial<Record<keyof User, any>>): Promise<UserDocument | null>;
    create(userInputs: UserCreationInput): Promise<UserDocument>;
    findOne(query: UserIdentifierQuery): Promise<UserDocument | null>;
    findById(userId: Types.ObjectId): Promise<UserDocument | null>;
    findCurrentUser(userId: Types.ObjectId): Promise<UserWithoutSensitiveInfo>;
}