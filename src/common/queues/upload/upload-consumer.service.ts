import { BadRequestException, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import amqp, { ChannelWrapper } from "amqp-connection-manager";
import { ConfirmChannel } from "amqplib";
import * as sharp from "sharp";
import { UploadRepository } from "src/api/upload-service/upload/upload.repository";

@Injectable()
export class UploadConsumerService implements OnModuleInit {
    private readonly logger = new Logger(UploadConsumerService.name)
    private channelWrapper: ChannelWrapper
    private readonly queueName = 'uploadQueue'

    constructor(private readonly uploadRepository: UploadRepository) {
        const connection = amqp.connect(['amqp://localhost'])
        this.channelWrapper = connection.createChannel()
    }

    public async onModuleInit() {
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
                this.logger.log(`Consumer service started and listening for messages on queue: ${this.queueName}`);
            })
        } catch (error) {
            this.logger.error('Error starting the consumer:', error)
        }
    }

    private async processMessage(message: any, channel: ConfirmChannel) {
        try {
            const content = JSON.parse(message.content)
            const { fileId, uploadedFile } = content
            if (!fileId || !uploadedFile) {
                throw new BadRequestException('Invalid message format')
            }

            let updateData: Buffer

            const fileBuffer = Buffer.from(uploadedFile.buffer, 'base64')
            if (uploadedFile.mimetype.startsWith('image/')) {
                updateData = await sharp(fileBuffer)
                    .resize({ width: 1200, withoutEnlargement: true })
                    .webp({ quality: 75 })
                    .toBuffer()
            } else {
                updateData = fileBuffer
            }

            await this.uploadRepository.findOneAndUpdate(fileId, { data: updateData })

            this.logger.log(`Upload processed successfully for file ID: ${fileId}`)
            channel.ack(message)
        } catch (parseError) {
            this.logger.error('Error parsing message content:', parseError)
            channel.nack(message, false, false)
        }
    }
}