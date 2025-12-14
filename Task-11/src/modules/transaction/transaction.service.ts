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

  findAll() {
    return this.prismaService.userTransaction.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.userTransaction.findUnique({
      where: { id },
    });
  }

  findByUserId(user: Express.Request['user']) {
    return this.prismaService.userTransaction.findMany({
      where: { userId: Number(user!.id) },
    });
  }

  findByOrderId(orderId: number) {
    return this.prismaService.userTransaction.findMany({
      where: { orderId },
    });
  }
}
