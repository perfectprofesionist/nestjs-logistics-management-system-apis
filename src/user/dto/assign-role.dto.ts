// ============================= START: Import Statements =============================
// Import integer validation decorator from class-validator
import { IsInt } from 'class-validator';
// Import Swagger decorator for API property documentation
import { ApiProperty } from '@nestjs/swagger';
// ============================= END: Import Statements =============================


// ============================= START: AssignRoleDto =============================
// Data Transfer Object for assigning a role to a user
export class AssignRoleDto {
    // ============================= START: roleId =============================
    // Swagger property description for the roleId field
    @ApiProperty({ description: 'Role ID to assign to the user' })
    // Validate that roleId is an integer
    @IsInt()
    roleId: number;
    // ============================= END: roleId =============================
}
// ============================= END: AssignRoleDto =============================
