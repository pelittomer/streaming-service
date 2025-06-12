import {
  WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PaymentRepository } from 'src/api/payment-service/payment/repository/payment.repository';
import { maxConnections } from 'src/common/types';
import { Types } from 'mongoose';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class OnlineStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private readonly logger = new Logger(OnlineStatusGateway.name)
  private connectedClients = new Map<string, string>()

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  private async emitOnlineUsers() {
    const onlineUserIds = Array.from(this.connectedClients.values())
    this.server.emit('onlineUsers', onlineUserIds)
  }

  private extractToken(client: Socket): string | undefined {
    return client.handshake.query.token as string ?? client.handshake.headers.authorization?.split(' ')[1]
  }

  private rejectClient(client: Socket, message: string) {
    this.logger.warn(`Connection rejected for client ${client.id}: ${message}`)
    client.disconnect(true)
  }

  async handleConnection(client: Socket) {
    const token = this.extractToken(client)
    if (!token) {
      return this.rejectClient(client, 'Authentication required. Please log in.')
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('TOKEN_SECRET_KEY')
      })

      const userId = payload.userId
      if (!userId) {
        return this.rejectClient(client, 'Invalid user ID in token. Connection refused.')
      }


      const packageData = await this.paymentRepository.findSubscription({ user: new Types.ObjectId(userId) })
      if (!packageData || !packageData.subscriptionEndDate || packageData.subscriptionEndDate <= new Date()) {
        return this.rejectClient(client, 'No active subscription found for this user.')
      }

      const onlineCount = Array.from(this.connectedClients.values()).filter(
        (id) => id === userId,
      ).length
      const maxAllowedConnections = maxConnections[packageData.subscriptionPackage] || Infinity
      if (onlineCount >= maxAllowedConnections) {
        return this.rejectClient(
          client,
          `Your account has reached the maximum number of allowed concurrent connections (${maxAllowedConnections}).`
        )
      }

      this.connectedClients.set(client.id, userId)
      this.logger.log(`User connected: ${userId} (Socket ID: ${client.id})`)
      this.emitOnlineUsers()
    } catch (error) {
      this.rejectClient(client, `User verification failed: ${error.message}`)
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = this.connectedClients.get(client.id)
    if (userId) {
      this.connectedClients.delete(client.id)
      this.logger.log(`User disconnected: ${userId} (Socket ID: ${client.id})`)
      this.emitOnlineUsers()
    }
  }
}