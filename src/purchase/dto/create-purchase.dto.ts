import { IsInt, Min } from 'class-validator';

export class CreatePurchaseDto {
  @IsInt()
  bookId: number = 0;

  @IsInt()
  @Min(1)
  quantity: number = 0;
}
