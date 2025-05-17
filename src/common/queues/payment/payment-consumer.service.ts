import { BadRequestException, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import amqp, { ChannelWrapper } from "amqp-connection-manager";
import { ConfirmChannel } from "amqplib";
import { PaymentRepository } from "src/api/payment-service/payment/payment.repository";
import { PaymentStatus } from "src/common/types";

@Injectable()
export class PaymentConsumerService implements OnModuleInit {
    private readonly logger = new Logger(PaymentConsumerService.name);
    private channelWrapper: ChannelWrapper;
    private readonly queueName = 'paymentQueue';
    private readonly subscriptionDurationDays = 30;

    constructor(private readonly paymentRepository: PaymentRepository) {
        const connection = amqp.connect(['amqp://localhost']);
        this.channelWrapper = connection.createChannel();
    }

    async onModuleInit() {
        try {
            await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
                await channel.assertQueue(this.queueName, { durable: true })
                await channel.consume(this.queueName, async (message) => {
                    if (message) {
                        try {
                            await this.processMessage(message, channel)
                        } catch (error) {
                            this.logger.error('Error processing message:', error)
                            channel.nack(message, false, false)
                        }
                    }
                })
                this.logger.log(`Consumer service started and listening for messages on queue: ${this.queueName}`)
            })
        } catch (error) {
            this.logger.error('Error starting the consumer:', error)
        }
    }

    private async processMessage(message: any, channel: ConfirmChannel) {
        try {
            const content = JSON.parse(message.content.toString())
            const { paymentId } = content

            const paymentItem = await this.paymentRepository.findById(paymentId)
            if (!paymentItem) {
                throw new BadRequestException(`Payment record with ID ${paymentId} not found.`)
            }

            const statusOptions = [PaymentStatus.Completed, PaymentStatus.Failed]
            const randomIndex = Math.floor(Math.random() * statusOptions.length)
            const paymentStatus = statusOptions[randomIndex]

            let subscriptionEndDate: Date | undefined
            if (paymentStatus === PaymentStatus.Completed) {
                const now = new Date()
                subscriptionEndDate = new Date(now.setDate(now.getDate() + this.subscriptionDurationDays))
            }

            await this.paymentRepository.findByIdAndUpdate(
                paymentId,
                { payment_status: paymentStatus, subscriptionEndDate }
            )

            this.logger.log(`Payment record with ID ${paymentId} updated. New status: ${paymentStatus}, Subscription End Date: ${subscriptionEndDate}`)
            channel.ack(message)
        } catch (parseError) {
            this.logger.error('Failed to parse message content:', parseError)
            channel.nack(message, false, false)
        }
    }
}