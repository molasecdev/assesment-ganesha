import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    // 1. Cari student berdasarkan email
    const student = await this.prisma.student.findUnique({
      where: { email: dto.email },
    });

    if (!student) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Bandingkan password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      student.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Buat JWT payload
    const payload = {
      sub: student.id,
      email: student.email,
    };

    // 4. Sign dan return token
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
