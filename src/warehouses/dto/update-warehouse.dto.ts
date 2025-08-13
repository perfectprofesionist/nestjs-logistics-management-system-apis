// ============================= START: UpdateWarehouseDto =============================

// Import PartialType utility to create update DTO from create DTO
import { PartialType } from '@nestjs/mapped-types';
// Import CreateWarehouseDto to extend it
import { CreateWarehouseDto } from './create-warehouse.dto';

// UpdateWarehouseDto inherits all properties from CreateWarehouseDto
// but makes them optional for partial updates
export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) { }

// ============================= END: UpdateWarehouseDto =============================
