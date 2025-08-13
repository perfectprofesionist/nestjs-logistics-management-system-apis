import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

// ============================= START: CreateUserDto =============================
export class CreateUserDto {
    // ============================= START: Email =============================
    // Swagger property description for the email field
    @ApiProperty({ description: 'Enter your email.' })
    // Validates that the string is a valid email format
    @IsEmail()
    // Ensures the email field is not empty
    @IsNotEmpty()
    // Validates the type is string
    @IsString()
    email: string;
    // ============================= END: Email =============================


    // ============================= START: Password =============================
    // Swagger property description for the password field
    @ApiProperty({ description: 'Enter a strong password.' })
    // Validates the type is string
    @IsString()
    // Ensures the password field is not empty
    @IsNotEmpty()
    password: string;
    // ============================= END: Password =============================


    // ============================= START: Name =============================
    // Swagger property description for the name field
    @ApiProperty({ description: 'Enter your name.' })
    // Validates the type is string
    @IsString()
    // Regex pattern to allow only letters and spaces in the name
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name must only contain letters and spaces.',
    })
    name: string;
    // ============================= END: Name =============================


    // ============================= START: Optional Role ID =============================
    // Swagger property description for roleId (optional)
    @ApiProperty({
        description: 'Role ID associated with the user',
        required: false,
    })
    // Marks the field as optional for validation
    @IsOptional()
    // Validates the field is a number if present
    @IsNumber()
    // Converts incoming query string to number automatically
    @Type(() => Number)
    roleId?: number;
    // ============================= END: Optional Role ID =============================


    // ============================= START: Optional Organization ID =============================
    // Swagger property description for organizationId (optional)
    @ApiProperty({
        description: 'Organization ID associated with the user',
        required: false,
    })
    // Marks the field as optional for validation
    @IsOptional()
    // Validates the field is a number if present
    @IsNumber()
    // Converts incoming query string to number automatically
    @Type(() => Number)
    organizationId?: number;
    // ============================= END: Optional Organization ID =============================
}

// ============================= END: CreateUserDto =============================
