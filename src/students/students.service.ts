import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupStudentDto } from './dto/signup-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: SignupStudentDto) {
    // Check if email already exists
    const existing = await this.prisma.student.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Save to database
    const student = await this.prisma.student.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        grade: dto.grade,
      },
    });

    // Return without password
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      grade: student.grade,
    };
  }
}
