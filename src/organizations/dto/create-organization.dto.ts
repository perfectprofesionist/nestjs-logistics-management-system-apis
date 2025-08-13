// ============================= START: CreateOrganizationDto =============================

import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {

  // ============================= START: Name Property =============================
  // Swagger documentation for the organization's name
  @ApiProperty({
    description: 'Name of the organization',
    example: 'Acme Corp',
  })
  // Validation: must be a non-empty string
  @IsString()
  @IsNotEmpty()
  name: string;
  // ============================= END: Name Property =============================


  // ============================= START: Type Property =============================
  // Swagger documentation for the organization type with allowed enum values
  @ApiProperty({
    description: 'Type of the organization',
    enum: ['customer', 'warehouse', 'logistics'],
    example: 'customer',
  })
  // Validation: must be one of the specified enum strings
  @IsEnum(['customer', 'warehouse', 'logistics'])
  type: 'customer' | 'warehouse' | 'logistics';
  // ============================= END: Type Property =============================


  // ============================= START: Address Property =============================
  // Swagger documentation for the organization's address
  @ApiProperty({
    description: 'Address of the organization',
    example: '123 Main St, Springfield',
  })
  // Validation: must be a non-empty string
  @IsString()
  @IsNotEmpty()
  address: string;
  // ============================= END: Address Property =============================


  // ============================= START: Phone Property =============================
  // Swagger documentation for the organization's phone number
  @ApiProperty({
    description: 'Phone number of the organization',
    example: '+1-555-1234',
  })
  // Validation: must be a non-empty string
  @IsString()
  @IsNotEmpty()
  phone: string;
  // ============================= END: Phone Property =============================


  // ============================= START: Email Property =============================
  // Swagger documentation for the organization's email address
  @ApiProperty({
    description: 'Email address of the organization',
    example: 'info@acme.com',
  })
  // Validation: must be a valid email format
  @IsEmail()
  email: string;
  // ============================= END: Email Property =============================
}

// ============================= END: CreateOrganizationDto =============================
