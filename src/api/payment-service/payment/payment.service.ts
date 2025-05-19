import { Injectable, Logger } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { SubscriptionPackagePrice } from 'src/common/types';
import { PaymentProducerService } from 'src/common/queues/payment/payment-producer.service';
import * as ErrorMessages from "./constants/error-messages.constant"
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name)
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentProducerService: PaymentProducerService,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async addPayment(userInputs: CreatePaymentDto, req: Request): Promise<string> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    const amount = SubscriptionPackagePrice[userInputs.subscriptionPackage]

    const paymentData = await this.paymentRepository.create({ ...userInputs, user: userId, amount })
    await this.paymentProducerService.paymentProccess({ paymentId: paymentData._id as Types.ObjectId })

    return ErrorMessages.PAYMENT_COMPLETED_SUCCESSFULLY
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async paymentProccess() {
    this.logger.debug(ErrorMessages.CHECKING_AUTO_RENEWAL_PAYMENTS_DEBUG_MESSAGE)
    try {
      const currentDate = new Date()
      const autoRenewEnabledPayments = await this.paymentRepository.find({
        autoRenewEnabled: true,
        subscriptionEndDate: { $lte: currentDate }
      })

      if (autoRenewEnabledPayments.length > 0) {
        this.logger.log(ErrorMessages.FOUND_PAYMENTS_TO_PROCESS_LOG_MESSAGE, autoRenewEnabledPayments.length)
        const paymentRefreshPromises = autoRenewEnabledPayments.map((payment) => {
          this.logger.log(ErrorMessages.DISPATCHING_PAYMENT_PROCESS_LOG_MESSAGE, payment._id)
          return this.paymentProducerService.paymentProccess({
            paymentId: payment._id as Types.ObjectId
          })
        })
        await Promise.all(paymentRefreshPromises)
        this.logger.log(ErrorMessages.SUCCESSFULLY_DISPATCHED_PAYMENT_PROCESSES_LOG_MESSAGE)
      } else {
        this.logger.debug(ErrorMessages.NO_PAYMENTS_FOUND_DEBUG_MESSAGE)
      }
    } catch (error) {
      this.logger.error(error.PAYMENT_SCHEDULE_PROCESSING_ERROR_MESSAGE, error)
    }
  }
}
