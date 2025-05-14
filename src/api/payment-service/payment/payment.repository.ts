import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "./schemas/payment.schema";
import { Model } from "mongoose";

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<Payment>
    ) { }

    async create(userInputs: Partial<Payment>): Promise<void> {
        await this.paymentModel.create(userInputs)
    }
}