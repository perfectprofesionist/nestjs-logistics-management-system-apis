// ============================= START: CreateWarehouseDto =============================

// Import necessary validation decorators from class-validator
import { IsNotEmpty, IsNumber, IsString, IsInt } from 'class-validator';

// DTO class to validate data when creating a new warehouse
export class CreateWarehouseDto {
    // ============================= START: Warehouse Name =============================
    // Warehouse name must be a non-empty string
    @IsString()
    @IsNotEmpty()
    name: string;
    // ============================= END: Warehouse Name =============================

    // ============================= START: Warehouse Address =============================
    // Warehouse address must be a non-empty string
    @IsString()
    @IsNotEmpty()
    address: string;
    // ============================= END: Warehouse Address =============================

    // ============================= START: Warehouse Latitude =============================
    // Latitude must be a number
    @IsNumber()
    latitude: number;
    // ============================= END: Warehouse Latitude =============================

    // ============================= START: Warehouse Longitude =============================
    // Longitude must be a number
    @IsNumber()
    longitude: number;
    // ============================= END: Warehouse Longitude =============================

    // ============================= START: Organization ID =============================
    // organizationId must be an integer (foreign key reference)
    @IsInt()
    organizationId: number;
    // ============================= END: Organization ID =============================
}

// ============================= END: CreateWarehouseDto =============================
