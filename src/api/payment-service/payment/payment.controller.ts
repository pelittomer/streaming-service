import { Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post(':id')
  addPayment() {
    //Processes a payment for the resource identified by the provided ID.
  }

}
