// ============================= START: CreateRoleDto =============================
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// Import Type decorator to transform query/body parameters to specific types
import { Type } from 'class-transformer';
// Import ApiProperty decorator for Swagger documentation
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    // ============================= START: Role Name Property =============================
    @ApiProperty({
        description: 'Name of the role', // Swagger description for this property
    })
    @IsString() // Validate that this is a string
    @IsNotEmpty() // Ensure this string is not empty
    name: string;
    // ============================= END: Role Name Property =============================

    // ============================= START: Permissions Property =============================
    @ApiProperty({
        description: 'Permissions associated with the role', // Swagger description
        required: false, // This property is optional in requests
    })
    @IsOptional() // Marks this property as optional during validation
    @IsArray() // Validates that this property is an array (if provided)
    @Type(() => Number) // Transforms each item in the array to a number type
    @IsInt({ each: true }) // Validates each item in the array is an integer
    permissions?: number[];
    // ============================= END: Permissions Property =============================
}
// ============================= END: CreateRoleDto =============================
