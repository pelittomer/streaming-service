import { Injectable, Logger } from '@nestjs/common';
import { PaymentRepository } from '../repository/payment.repository';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { SubscriptionPackagePrice } from 'src/common/types';
import { PaymentProducerService } from 'src/common/queues/payment/payment-producer.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AddPaymentParams, IPaymentService } from './payment.service.interface';
import { PAYMENT_MESSAGES } from '../constants/payment.message';

@Injectable()
export class PaymentService implements IPaymentService {
  private readonly logger = new Logger(PaymentService.name)
  
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentProducerService: PaymentProducerService,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async addPayment({ payload, req }: AddPaymentParams): Promise<string> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)

    const amount = SubscriptionPackagePrice[payload.subscriptionPackage]

    const paymentData = await this.paymentRepository.create({ ...payload, user: userId, amount })
    await this.paymentProducerService.paymentProccess({ paymentId: paymentData._id as Types.ObjectId })

    return PAYMENT_MESSAGES.PAYMENT_COMPLETED_SUCCESSFULLY
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async paymentProccess() {
    this.logger.debug(PAYMENT_MESSAGES.CHECKING_AUTO_RENEWAL_PAYMENTS_DEBUG_MESSAGE)
    try {
      const currentDate = new Date()
      const autoRenewEnabledPayments = await this.paymentRepository.find({
        autoRenewEnabled: true,
        subscriptionEndDate: { $lte: currentDate }
      })

      if (autoRenewEnabledPayments.length > 0) {
        this.logger.log(PAYMENT_MESSAGES.FOUND_PAYMENTS_TO_PROCESS_LOG_MESSAGE, autoRenewEnabledPayments.length)
        const paymentRefreshPromises = autoRenewEnabledPayments.map((payment) => {
          this.logger.log(PAYMENT_MESSAGES.DISPATCHING_PAYMENT_PROCESS_LOG_MESSAGE, payment._id)
          return this.paymentProducerService.paymentProccess({
            paymentId: payment._id as Types.ObjectId
          })
        })
        await Promise.all(paymentRefreshPromises)
        this.logger.log(PAYMENT_MESSAGES.SUCCESSFULLY_DISPATCHED_PAYMENT_PROCESSES_LOG_MESSAGE)
      } else {
        this.logger.debug(PAYMENT_MESSAGES.NO_PAYMENTS_FOUND_DEBUG_MESSAGE)
      }
    } catch (error) {
      this.logger.error(error.PAYMENT_SCHEDULE_PROCESSING_ERROR_MESSAGE, error)
    }
  }
}
