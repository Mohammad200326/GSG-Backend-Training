import { Prisma, UserTransaction } from 'generated/prisma';

export type CreateTransactionDto = Pick<
  UserTransaction,
  'amount' | 'orderId' | 'paymentMethod' | 'type'
> &
  Partial<Pick<UserTransaction, 'orderReturnId'>>;

export type UpdateTransactionDto = { orderReturnId: number };

export type TransactionResponseDTO = Prisma.UserTransactionGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        email: true;
      };
    };
    order: true;
    orderReturn: true;
  };
}>;
