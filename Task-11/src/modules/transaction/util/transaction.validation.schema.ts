import z, { ZodType } from 'zod';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../types/transactions.dto';
import { PaymentMethod, TransactionType } from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/client';

export const CreateTransactionDTOValidationSchema = z.object({
  amount: z.number().transform((val) => new Decimal(val)),
  orderId: z.union([z.number(), z.string()]).transform((val) => BigInt(val)),
  paymentMethod: z.enum([PaymentMethod.CASH]),
  type: z.enum([TransactionType.CREDIT, TransactionType.DEBIT]),
  orderReturnId: z.bigint().optional(),
}) satisfies ZodType<CreateTransactionDto>;

export const UpdateTransactionDtoValidationSchema = z.object({
  orderReturnId: z.number().min(1),
}) satisfies ZodType<Partial<UpdateTransactionDto>>;
