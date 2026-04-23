import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async purchase(@Request() req: any, @Body() dto: CreatePurchaseDto) {
    const studentId = req.user.sub; // dari JWT payload
    return this.purchaseService.purchase(studentId, dto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getMyPurchases(@Request() req: any) {
    const studentId = req.user.sub;
    return this.purchaseService.getMyPurchases(studentId);
  }
}
