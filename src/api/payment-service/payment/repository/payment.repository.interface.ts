import { Types } from "mongoose";
import { Payment } from "../entities/payment.entity";
import { PaymentDocument } from "../entities/types";
export interface FindByIdAndUpdatePaymentOptions {
    paymentId: Types.ObjectId;
    payload: Partial<Payment>;
}
export type TFindPayment = Pick<PaymentDocument, '_id' | 'subscriptionEndDate'>[]
export interface IPaymentRepository {
    create(payload: Partial<Payment>): Promise<PaymentDocument>;
    findSubscription(queryFields: Partial<Payment>): Promise<Payment | null>;
    findById(paymentId: Types.ObjectId): Promise<PaymentDocument | null>;
    findByIdAndUpdate(params: FindByIdAndUpdatePaymentOptions): Promise<void>;
    find(queryFields: Partial<Payment | any>): Promise<TFindPayment>;
}