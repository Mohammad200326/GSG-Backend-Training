import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/decorators/roles.decorator';
import type {
  CreateOrderDTO,
  CreateOrderResponseDTO,
  CreateOrderReturnDTO,
  OrderOverviewResponseDTO,
  OrderResponseDTO,
  UpdateOrderDTO,
  UpdateReturnDTO,
} from './types/order.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  createOrderDTOValidationSchema,
  createReturnDTOValidationSchema,
  updateOrderDTOSchema,
  updateReturnDTOSchema,
} from './util/order.validation.schema';
import { paginationSchema } from 'src/utils/api.util';
import type {
  PaginatedResult,
  PaginationQueryType,
} from 'src/types/util.types';

@Controller('order')
@Roles(['CUSTOMER', 'ADMIN'])
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createOrderDTOValidationSchema))
    createOrderDto: CreateOrderDTO,

    @Req() request: Express.Request,
  ): Promise<CreateOrderResponseDTO> {
    return this.orderService.create(createOrderDto, BigInt(request.user!.id));
  }

  @Get()
  findAll(
    @Req() request: Express.Request,

    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ): Promise<PaginatedResult<OrderOverviewResponseDTO>> {
    return this.orderService.findAll(BigInt(request.user!.id), query);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: Express.Request,
  ): Promise<OrderResponseDTO> {
    return this.orderService.findOne(+id, BigInt(request.user!.id));
  }

  @Patch(':id')
  @Roles(['ADMIN'])
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateOrderDTOSchema))
    updateOrderDTO: UpdateOrderDTO,
  ): Promise<OrderResponseDTO> {
    return this.orderService.update(+id, updateOrderDTO);
  }

  // returns end points

  // create return
  @Post('return')
  createReturn(
    @Body(new ZodValidationPipe(createReturnDTOValidationSchema))
    createReturnDto: CreateOrderReturnDTO,
    @Req() request: Express.Request,
  ): Promise<OrderResponseDTO> {
    return this.orderService.createReturn(
      createReturnDto,
      BigInt(request.user!.id),
    );
  }

  @Patch('return/:id')
  @Roles(['ADMIN'])
  updateReturn(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateReturnDTOSchema))
    updateReturnDTO: UpdateReturnDTO,
  ): Promise<OrderResponseDTO> {
    return this.orderService.updateReturn(+id, updateReturnDTO);
  }
}
