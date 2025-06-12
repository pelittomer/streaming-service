import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "../entities/payment.entity";
import { Model, Types } from "mongoose";
import { PaymentDocument } from "../entities/types";
import { FindByIdAndUpdatePaymentOptions, IPaymentRepository, TFindPayment } from "./payment.repository.interface";

@Injectable()
export class PaymentRepository implements IPaymentRepository {
    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<Payment>
    ) { }

    async create(payload: Partial<Payment>): Promise<PaymentDocument> {
        return await this.paymentModel.create(payload)
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

    async findByIdAndUpdate({ payload, paymentId }: FindByIdAndUpdatePaymentOptions): Promise<void> {
        await this.paymentModel.findByIdAndUpdate(paymentId, payload)
    }

    async find(
        queryFields: Partial<Payment | any>
    ): Promise<TFindPayment> {
        return await this.paymentModel.find(queryFields)
            .select('subscriptionEndDate')
            .lean()
    }
}