import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { StudentsService } from './students.service';
import { SignupStudentDto } from './dto/signup-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupStudentDto) {
    return this.studentsService.signup(dto);
  }
}
