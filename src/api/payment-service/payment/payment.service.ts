import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { SubscriptionPackagePrice } from 'src/common/types';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async addPayment(userInputs: CreatePaymentDto, req: Request): Promise<string> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)
    
    const amount = SubscriptionPackagePrice[userInputs.subscriptionPackage]

    await this.paymentRepository.create({ ...userInputs, user: userId, amount })

    return 'Payment process completed successfully.'
  }
}
