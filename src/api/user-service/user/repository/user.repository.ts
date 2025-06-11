import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../entities/user.entity";
import { Model, Types } from "mongoose";
import { UserDocument } from "../entities/types";
import { IUserRepository, UserCreationInput, UserIdentifierQuery, UserWithoutSensitiveInfo } from "./user.repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
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