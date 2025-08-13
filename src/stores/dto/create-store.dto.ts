import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, IsNumber, IsNotEmpty } from 'class-validator';
// ============================= START: CreateStoreDto Class =============================
export class CreateStoreDto {
    // ============================= START: organizationId Property =============================
    // Swagger documentation: describes the organization ID that the store belongs to
    @ApiProperty({ description: 'ID of the organization the store belongs to' })
    // Validate that organizationId is an integer
    @IsInt()
    // Transform input data to a number type (useful when input comes as string)
    @Type(() => Number)
    // The actual property holding the organization ID
    organizationId: number;
    // ============================= END: organizationId Property =============================


    // ============================= START: name Property =============================
    // Swagger documentation: describes the store's name
    @ApiProperty({ description: 'Name of the store' })
    // Validate that name is a string
    @IsString()
    // Validate that name is not an empty string
    @IsNotEmpty()
    // The actual property holding the store name
    name: string;
    // ============================= END: name Property =============================


    // ============================= START: address Property =============================
    // Swagger documentation: describes the store's address
    @ApiProperty({ description: 'Address of the store' })
    // Validate that address is a string
    @IsString()
    // Validate that address is not an empty string
    @IsNotEmpty()
    // The actual property holding the store address
    address: string;
    // ============================= END: address Property =============================


    // ============================= START: latitude Property =============================
    // Swagger documentation: describes the latitude coordinate of the store location
    @ApiProperty({ description: 'Latitude coordinate of the store location' })
    // Validate that latitude is a number with up to 8 decimal places
    @IsNumber({ maxDecimalPlaces: 8 })
    // Transform input data to a number type
    @Type(() => Number)
    // The actual property holding the latitude value
    latitude: number;
    // ============================= END: latitude Property =============================


    // ============================= START: longitude Property =============================
    // Swagger documentation: describes the longitude coordinate of the store location
    @ApiProperty({ description: 'Longitude coordinate of the store location' })
    // Validate that longitude is a number with up to 8 decimal places
    @IsNumber({ maxDecimalPlaces: 8 })
    // Transform input data to a number type
    @Type(() => Number)
    // The actual property holding the longitude value
    longitude: number;
    // ============================= END: longitude Property =============================
}
// ============================= END: CreateStoreDto Class =============================