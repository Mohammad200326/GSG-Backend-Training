import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  // Patch,
  Param,
  Query,
  // Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import type {
  CreateTransactionDto,
  TransactionResponseDTO,
} from './types/transactions.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateTransactionDTOValidationSchema } from './util/transaction.validation.schema';
import { paginationSchema } from 'src/utils/api.util';
import type {
  PaginatedResult,
  PaginationQueryType,
} from 'src/types/util.types';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateTransactionDTOValidationSchema))
    createTransactionDto: CreateTransactionDto,
    @Req() request: Express.Request,
  ) {
    return this.transactionService.create(createTransactionDto, request.user);
  }

  @Get()
  @Roles(['ADMIN'])
  findAll(
    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ): Promise<PaginatedResult<TransactionResponseDTO>> {
    return this.transactionService.findAll(query);
  }

  @Get('user')
  findByUserId(
    @Req() request: Express.Request,
    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ) {
    return this.transactionService.findByUserId(request.user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Get('order/:orderId')
  findByOrderId(@Param('orderId') orderId: string) {
    return this.transactionService.findByOrderId(+orderId);
  }
}
