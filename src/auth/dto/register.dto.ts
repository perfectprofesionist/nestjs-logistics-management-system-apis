// ============================== START: Imports ==============================
// Importing ApiProperty to define Swagger documentation for each property
import { ApiProperty } from '@nestjs/swagger';

// Importing class-validator decorators for input validation
import {
    IsEmail,       // Validates that a value is in a valid email format
    IsNotEmpty,    // Ensures the value is not empty
    IsNumber,      // Ensures the value is a number
    IsOptional,    // Marks a property as optional (no error if not provided)
    IsString,      // Ensures the value is a string
    Matches,       // Validates a value against a given regex pattern
} from 'class-validator';
// =============================== END: Imports ===============================



// ============================== START: RegisterDto Class ==============================
// DTO (Data Transfer Object) for user registration
// Defines required and optional fields along with their validation rules.
export class RegisterDto {

    // -------------------------- START: Email Field --------------------------
    @ApiProperty({ description: 'Enter your email.' }) // Swagger UI doc info
    @IsEmail()       // Valid email format check
    @IsNotEmpty()    // Cannot be empty
    @IsString()      // Must be a string
    email: string;   // Email address for the user account
    // --------------------------- END: Email Field ---------------------------


    // ------------------------- START: Password Field -------------------------
    @ApiProperty({ description: 'Enter a strong password.' }) // Swagger UI doc
    @IsString()     // Must be a string
    @IsNotEmpty()   // Cannot be empty
    password: string; // Password for the account
    // -------------------------- END: Password Field --------------------------


    // --------------------------- START: Name Field ---------------------------
    @ApiProperty({ description: 'Enter your name.' }) // Swagger UI doc
    @IsString()     // Must be a string
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name must only contain letters and spaces.', // Custom error message
    })
    name: string;   // Full name of the user
    // ---------------------------- END: Name Field ----------------------------


    // ------------------------- START: Role ID Field --------------------------
    @ApiProperty({
        example: 2,                                      // Example value in Swagger
        description: 'Role ID associated with the user', // Documentation text
        required: false,                                 // Optional field
    })
    @IsOptional()   // No validation error if not provided
    @IsNumber()     // Must be a number if provided
    roleId?: number; // ID of the role assigned to the user
    // -------------------------- END: Role ID Field ---------------------------


    // ---------------------- START: Organization ID Field ---------------------
    @ApiProperty({
        example: 1,                                             // Example in Swagger
        description: 'Organization ID associated with the user', // Documentation text
        required: false,                                        // Optional field
    })
    @IsOptional()   // No validation error if not provided
    @IsNumber()     // Must be a number if provided
    organizationId?: number; // ID of the organization the user belongs to
    // ----------------------- END: Organization ID Field ----------------------

}
// =============================== END: RegisterDto Class ===============================
