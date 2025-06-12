import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Types } from "mongoose";
import { User } from "src/api/user-service/user/entities/user.entity";
import { PaymentMethod, PaymentStatus, SubscriptionPackage } from "src/common/types";
import { PaymentDetails, RefundDetails } from "./types";

@Schema({ timestamps: true })
export class Payment {
    @Prop({ type: String, enum: PaymentMethod })
    payment_method: PaymentMethod;

    @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.Pending })
    payment_status: PaymentStatus;

    @Prop({ type: Number, required: true, min: 0 })
    amount: number;

    @Prop({ type: String, required: true, default: 'TRY' })
    currency: string;

    @Prop({ type: Date, default: Date.now })
    payment_date: Date;

    @Prop({
        type: {
            card_details: {
                card_number: String,
                card_holder_name: String,
                expiry_month: Number,
                expiry_year: Number,
            },
            eft_details: {
                sender_name: String,
                sender_bank: String,
                receiver_bank: String,
                transfer_date: Date,
            },
        },
    })
    payment_details: PaymentDetails;

    @Prop({ type: String })
    failure_reason: string;

    @Prop({
        type: {
            refund_amount: Number,
            refund_date: Date,
            refund_reason: String,
        },
    })
    refund_details: RefundDetails;

    @Prop({ type: String, enum: SubscriptionPackage, default: SubscriptionPackage.SINGLE })
    subscriptionPackage: SubscriptionPackage;

    @Prop({ type: Date })
    subscriptionEndDate?: Date;

    @Prop({ type: Boolean, default: false })
    autoRenewEnabled: boolean;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)

