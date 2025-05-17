import { forwardRef, Module } from "@nestjs/common";
import { PaymentConsumerService } from "./payment-consumer.service";
import { PaymentProducerService } from "./payment-producer.service";
import { PaymentModule } from "src/api/payment-service/payment/payment.module";

@Module({
    providers: [PaymentConsumerService, PaymentProducerService],
    imports: [forwardRef(() => PaymentModule)],
    exports: [PaymentProducerService],
})
export class PaymentQueueModule { }