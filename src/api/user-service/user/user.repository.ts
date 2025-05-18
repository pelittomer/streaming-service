import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model, Types } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { FavoriteRepository } from "src/api/profile-service/favorite/favorite.repository";

type UserCreationInput = Pick<User, 'username' | 'email' | 'password'>
type UserIdentifierQuery = Partial<Pick<User, 'email' | 'username'>>
export type UserWithoutSensitiveInfo = Omit<UserDocument, 'emailVerificationToken' | 'password'>

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly favoriteRepository: FavoriteRepository,
    ) { }

    async findByOrQuery(queryFields: Partial<Record<keyof User, any>>): Promise<UserDocument | null> {
        const orConditions = Object.keys(queryFields).map(key => ({
            [key]: queryFields[key]
        }))
        return await this.userModel.findOne({ $or: orConditions })
    }

    async create(userInputs: UserCreationInput): Promise<UserDocument> {
        let user: UserDocument | undefined
        await this.sharedUtilsService.executeTransaction(async (session) => {
            [user] = await this.userModel.create([userInputs], { session })
            await this.favoriteRepository.create({ profile: user._id as Types.ObjectId }, session)
        })
        return user as UserDocument
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