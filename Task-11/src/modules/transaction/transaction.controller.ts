import {
  Controller,
  // Get,
  Post,
  Body,
  Req,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import type { CreateTransactionDto } from './types/transactions.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateTransactionDTOValidationSchema } from './util/transaction.validation.schema';

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

  // @Get()
  // findAll() {
  //   return this.transactionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionService.remove(+id);
  // }
}
