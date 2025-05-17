import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Payment, PaymentDocument } from "./schemas/payment.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<Payment>
    ) { }

    async create(userInputs: Partial<Payment>): Promise<PaymentDocument> {
        return await this.paymentModel.create(userInputs)
    }

    async findSubscription(queryFields: Partial<Payment>): Promise<Payment | null> {
        return await this.paymentModel.findOne(queryFields)
            .sort({ createdAt: -1 })
            .select('subscriptionPackage subscriptionEndDate')
            .lean()
    }

    async findById(paymentId: Types.ObjectId): Promise<PaymentDocument | null> {
        return await this.paymentModel.findById(paymentId)
    }

    async findByIdAndUpdate(paymentId: Types.ObjectId, userInputs: Partial<Payment>): Promise<void> {
        await this.paymentModel.findByIdAndUpdate(paymentId, userInputs)
    }
}