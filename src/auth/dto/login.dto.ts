// ============================== START: Imports ==============================
// Importing validation decorators from class-validator for input validation
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Importing ApiProperty from NestJS Swagger to generate API documentation
import { ApiProperty } from '@nestjs/swagger';
// =============================== END: Imports ===============================



// ============================== START: LoginDto Class ==============================
// This DTO (Data Transfer Object) defines the structure and validation rules for the login request body.
export class LoginDto {

    // -------------------------- START: Email Field --------------------------
    @ApiProperty({
        example: 'admin@example.com',   // Example value shown in Swagger UI
        type: String,                   // Data type is a string
        description: 'Email address of the user', // Brief description for documentation
        required: true,                 // Field must be present in the request
    })
    @IsEmail()      // Validates that the input is in proper email format
    @IsNotEmpty()   // Ensures the field is not empty
    email: string;  // The email property to be provided by the user
    // --------------------------- END: Email Field ---------------------------


    // ------------------------- START: Password Field -------------------------
    @ApiProperty({
        example: 'admin123',             // Example value shown in Swagger UI
        type: String,                    // Data type is a string
        description: 'Password of the user', // Brief description for documentation
        required: true,                  // Field must be present in the request
    })
    @IsString()     // Ensures the value is a string
    @IsNotEmpty()   // Ensures the field is not empty
    password: string; // The password property to be provided by the user
    // -------------------------- END: Password Field --------------------------

}
// =============================== END: LoginDto Class ===============================
