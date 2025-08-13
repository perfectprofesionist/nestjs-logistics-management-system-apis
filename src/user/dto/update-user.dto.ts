// ============================= START: Import Statements =============================
// Import PartialType helper to create partial versions of DTOs
import { PartialType } from '@nestjs/mapped-types';
// Import the CreateUserDto class to extend from
import { CreateUserDto } from './create-user.dto';
// ============================= END: Import Statements =============================


// ============================= START: UpdateUserDto =============================
// DTO for updating a user, all fields optional by extending PartialType of CreateUserDto
export class UpdateUserDto extends PartialType(CreateUserDto) { }
// ============================= END: UpdateUserDto =============================
