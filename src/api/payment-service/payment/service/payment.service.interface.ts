import { Request } from "express";
import { CreatePaymentDto } from "../dto/create-payment.dto";

export interface AddPaymentParams {
    payload: CreatePaymentDto;
    req: Request;
}
export interface IPaymentService {
    addPayment(params: AddPaymentParams): Promise<string>;
}