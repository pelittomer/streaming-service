import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Request } from 'express';
import { Role } from 'src/api/user-service/user/entities/types';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Post('')
  addPayment(
    @Body() payload: CreatePaymentDto,
    @Req() req: Request
  ) {
    return this.paymentService.addPayment({ payload, req })
  }
}
