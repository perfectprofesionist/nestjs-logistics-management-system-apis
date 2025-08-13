// ============================= START: Import PartialType from NestJS Swagger =============================
// Import PartialType utility to create DTOs with optional fields based on another DTO
import { PartialType } from '@nestjs/swagger';
// ============================= END: Import PartialType from NestJS Swagger =============================

// ============================= START: Import CreateOrderDto =============================
// Import the base CreateOrderDto to extend for update operations
import { CreateOrderDto } from './create-order.dto';
// ============================= END: Import CreateOrderDto =============================


// ============================= START: UpdateOrderDto Class Declaration =============================
// Define UpdateOrderDto class extending CreateOrderDto with all fields optional
export class UpdateOrderDto extends PartialType(CreateOrderDto) { }
// ============================= END: UpdateOrderDto Class Declaration =============================
