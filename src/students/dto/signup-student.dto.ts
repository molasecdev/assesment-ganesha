import { IsEmail, IsInt, IsString, MinLength, Max } from 'class-validator';

export class SignupStudentDto {
  @IsString()
  name: string = '';

  @IsEmail()
  email: string = '';

  @IsString()
  @MinLength(6)
  password: string = '';

  @IsInt()
  @Max(10)
  grade: number = 0;
}
