// Import PartialType utility from NestJS Swagger module to create DTO with optional fields
import { PartialType } from '@nestjs/swagger';
// Import CreateStoreDto to use it as base for update DTO
import { CreateStoreDto } from './create-store.dto';

// Define UpdateStoreDto by extending CreateStoreDto and making all fields optional
export class UpdateStoreDto extends PartialType(CreateStoreDto) { }
