import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async purchase(studentId: number, dto: CreatePurchaseDto) {
    // 1. Cek apakah buku ada
    const book = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });

    if (!book) {
      throw new NotFoundException(`Book with id ${dto.bookId} not found`);
    }

    // 2. Hitung total price
    const totalPrice = book.price * dto.quantity;

    // 3. Simpan puruchase
    const purchase = await this.prisma.purchase.create({
      data: {
        studentId,
        bookId: dto.bookId,
        quantity: dto.quantity,
        totalPrice,
      },
      include: {
        book: {
          select: { id: true, title: true, price: true },
        },
        student: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      id: purchase.id,
      purchaseDate: purchase.purchaseDate,
      quantity: purchase.quantity,
      totalPrice: purchase.totalPrice,
      book: purchase.book,
      student: purchase.student,
    };
  }

  async getMyPurchases(studentId: number) {
    const purchases = await this.prisma.purchase.findMany({
      where: { studentId },
      orderBy: { purchaseDate: 'desc' },
      include: {
        book: {
          select: { id: true, title: true, price: true },
        },
      },
    });

    return purchases.map((purchase) => ({
      id: purchase.id,
      purchaseDate: purchase.purchaseDate,
      quantity: purchase.quantity,
      totalPrice: purchase.totalPrice,
      book: purchase.book,
    }));
  }
}
