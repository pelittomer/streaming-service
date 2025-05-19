import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model, Types } from "mongoose";

type UserCreationInput = Pick<User, 'username' | 'email' | 'password'>
type UserIdentifierQuery = Partial<Pick<User, 'email' | 'username'>>
export type UserWithoutSensitiveInfo = Omit<UserDocument, 'emailVerificationToken' | 'password'>

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async findByOrQuery(queryFields: Partial<Record<keyof User, any>>): Promise<UserDocument | null> {
        const orConditions = Object.keys(queryFields).map(key => ({
            [key]: queryFields[key]
        }))
        return await this.userModel.findOne({ $or: orConditions })
    }

    async create(userInputs: UserCreationInput): Promise<UserDocument> {
        return await this.userModel.create(userInputs)
    }

    async findOne(query: UserIdentifierQuery): Promise<UserDocument | null> {
        return await this.userModel.findOne(query)
    }

    async findById(userId: Types.ObjectId): Promise<UserDocument | null> {
        return await this.userModel.findById(userId)
    }

    async findCurrentUser(userId: Types.ObjectId): Promise<UserWithoutSensitiveInfo> {
        return await this.userModel.findById(userId).select('-emailVerificationToken -password')
    }
}