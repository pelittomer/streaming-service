import { Types } from "mongoose";
import { Role } from "src/api/user-service/user/entities/types";

export enum ListStatus {
    Public = "PUBLIC",
    Private = "PRIVATE"
}

export enum PaymentMethod {
    CreditCard = "credit_card",
    EFT = "eft",
    PayPal = "paypal",
    MobilePayment = "mobile_payment",
    Other = "other"
}

export enum PaymentStatus {
    Pending = "pending",
    Processing = "processing",
    Completed = "completed",
    Failed = "failed",
    Refunded = "refunded",
    PartiallyRefunded = "partially_refunded"
}

export enum SubscriptionPackage {
    SINGLE = 'Single Package',
    FAMILY = 'Family Package',
    PREMIUM = 'Premium Package',
}

export const SubscriptionPackagePrice = {
    [SubscriptionPackage.SINGLE]: 50,
    [SubscriptionPackage.FAMILY]: 150,
    [SubscriptionPackage.PREMIUM]: 250,
}

export enum FilmographyRole {
    DIRECTOR = 'Director',
    CO_DIRECTOR = 'Co-Director',
    ASSISTANT_DIRECTOR = 'Assistant Director',
    EXECUTIVE_PRODUCER = 'Executive Producer',
    PRODUCER = 'Producer',
    WRITER = 'Writer',
}

export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export interface UserInfo {
    userId: Types.ObjectId;
    username: string;
    roles: Role;
}

enum MaxConnections {
    SINGLE = 1,
    FAMILY = 3,
    PREMIUM = 5,
}

export const maxConnections: Record<SubscriptionPackage, MaxConnections> = {
    [SubscriptionPackage.SINGLE]: MaxConnections.SINGLE,
    [SubscriptionPackage.FAMILY]: MaxConnections.FAMILY,
    [SubscriptionPackage.PREMIUM]: MaxConnections.PREMIUM,
}