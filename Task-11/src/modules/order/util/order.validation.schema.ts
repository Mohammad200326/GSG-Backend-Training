import z, { ZodType } from 'zod';
import {
  CreateOrderDTO,
  CreateOrderReturnDTO,
  UpdateOrderDTO,
  UpdateReturnDTO,
} from '../types/order.dto';
import { OrderStatus, ReturnStatus } from 'generated/prisma';

export const createOrderDTOValidationSchema = z.array(
  z.object({
    productId: z.number().min(1),
    qty: z.number().min(1),
  }),
) satisfies ZodType<CreateOrderDTO>;

export const createReturnDTOValidationSchema = z.object({
  orderId: z.number().min(1),
  items: z.array(
    z.object({
      productId: z.number().min(1),
      qty: z.number().min(1),
    }),
  ),
}) satisfies ZodType<CreateOrderReturnDTO>;

export const updateOrderDTOSchema = z.object({
  orderStatus: z.enum([OrderStatus.PENDING, OrderStatus.SUCCESS]),
}) satisfies ZodType<UpdateOrderDTO>;

export const updateReturnDTOSchema = z.object({
  returnStatus: z.enum([
    ReturnStatus.PENDING,
    ReturnStatus.PICKED,
    ReturnStatus.REFUND,
  ]),
}) satisfies ZodType<UpdateReturnDTO>;
