import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule],
  controllers: [PurchaseController],
  providers: [PurchaseService, JwtGuard], // ← register JwtGuard sebagai provider
})
export class PurchaseModule {}
