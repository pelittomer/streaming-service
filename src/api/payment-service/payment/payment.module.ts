import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { PaymentRepository } from './payment.repository';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { PaymentQueueModule } from 'src/common/queues/payment/payment-queue.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    SharedUtilsModule, PaymentQueueModule
  ],
  exports: [PaymentRepository]
})
export class PaymentModule { }
