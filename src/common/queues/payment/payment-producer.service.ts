import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import amqp, { ChannelWrapper } from "amqp-connection-manager";
import { Channel, Options } from "amqplib"
import { Types } from "mongoose";

export interface TPaymentData {
    paymentId: Types.ObjectId;
}

@Injectable()
export class PaymentProducerService {
    private readonly logger = new Logger(PaymentProducerService.name)
    private channelWrapper: ChannelWrapper

    constructor() {
        const connection = amqp.connect(['amqp://localhost'])
        this.channelWrapper = connection.createChannel({
            setup: (channel: Channel) => {
                return channel.assertQueue('paymentQueue', { durable: true })
            }
        })
    }

    async paymentProccess(paymentData: TPaymentData) {
        try {
            const options: Options.Publish = {
                persistent: true,
            };
            await this.channelWrapper.sendToQueue(
                'paymentQueue',
                Buffer.from(JSON.stringify(paymentData)),
                options
            )
            this.logger.warn('Sent to Queue.')
        } catch (error) {
            throw new HttpException(
                'Error adding file to queue',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}