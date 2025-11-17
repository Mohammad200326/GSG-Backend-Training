import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTransactionDto } from './types/transactions.dto';

@Injectable()
export class TransactionService {
  constructor(private prismaService: DatabaseService) {}
  create(
    createTransactionDto: CreateTransactionDto,
    user: Express.Request['user'],
  ) {
    const dataPayload = {
      ...createTransactionDto,
      userId: Number(user!.id),
    };
    return this.prismaService.userTransaction.create({
      data: dataPayload,
    });
  }

  // findAll() {
  //   return `This action returns all transaction`;
  // }

  findOne(id: number) {
    return this.prismaService.userTransaction.findUnique({
      where: { id },
    });
  }

  // findByOrderId(orderId: number) {
  //   return `This action returns transaction for order #${orderId}`;
  // }

  // findByUserId(userId: number) {
  //   return `This action returns transactions for user #${userId}`;
  // }
}
