import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model, Types } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { FavoriteRepository } from "src/api/profile-service/favorite/favorite.repository";

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

    async create(userInputs: Partial<User>): Promise<UserDocument> {
        let user: UserDocument | undefined
        await this.sharedUtilsService.executeTransaction(async (session) => {
            [user] = await this.userModel.create([userInputs], { session })
            await this.favoriteRepository.create({ profile: user._id as Types.ObjectId }, session)
        })
        return user as UserDocument
    }

    async findOne(query: Partial<User>): Promise<UserDocument | null> {
        return await this.userModel.findOne(query)
    }

    async findById(userId: Types.ObjectId): Promise<UserDocument | null> {
        return await this.userModel.findById(userId)
    }

    async findCurrentUser(userId: Types.ObjectId): Promise<Omit<UserDocument, 'emailVerificationToken' | 'password'>> {
        return await this.userModel.findById(userId).select('-emailVerificationToken -password')
    }

    async findByIdAndUpdate(queryFields: Pick<UserDocument, '_id'>, userInputs: Partial<User>): Promise<void> {
        await this.userModel.findByIdAndUpdate(queryFields, userInputs)
    }

    async findOnlineUsers(onlineUserIds) {
        return await this.userModel.find({ _id: { $in: onlineUserIds } }).select('username _id')
    }
}