import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  CreateTransactionDto,
  TransactionResponseDTO,
} from './types/transactions.dto';
import { PaginatedResult, PaginationQueryType } from 'src/types/util.types';
import { removeFields } from 'src/utils/object.util';

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

  findAll(
    query: PaginationQueryType,
  ): Promise<PaginatedResult<TransactionResponseDTO>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const transactions = await prisma.userTransaction.findMany({
        ...removeFields(pagination, ['page']),

        include: {
          user: true,
          order: true,
          orderReturn: true,
        },
      });

      const count = await prisma.userTransaction.count();

      return {
        data: transactions,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  findOne(id: number) {
    return this.prismaService.userTransaction.findUnique({
      where: { id },
    });
  }

  findByUserId(
    user: Express.Request['user'],
    query: PaginationQueryType,
  ): Promise<PaginatedResult<TransactionResponseDTO>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const transactions = await prisma.userTransaction.findMany({
        ...removeFields(pagination, ['page']),
        where: { userId: Number(user!.id) },
        include: {
          user: true,
          order: true,
          orderReturn: true,
        },
      });

      const count = await prisma.userTransaction.count({
        where: { userId: Number(user!.id) },
      });

      return {
        data: transactions,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  findByOrderId(orderId: number) {
    return this.prismaService.userTransaction.findMany({
      where: { orderId },
    });
  }
}
