// ============================= START: UpdateRoleDto =============================
// Import PartialType utility to create a DTO with all properties optional, based on CreateRoleDto
import { PartialType } from '@nestjs/mapped-types';
// Import CreateRoleDto as the base DTO
import { CreateRoleDto } from './create-role.dto';

// UpdateRoleDto extends CreateRoleDto but makes all fields optional for partial updates
export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
// ============================= END: UpdateRoleDto =============================
