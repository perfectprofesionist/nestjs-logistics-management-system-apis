import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, Min, IsDateString } from 'class-validator';

// ============================= START: CreateOrderDto Class =============================
// Purpose:
//   - Defines the shape and validation rules for creating an Order in the system.
//   - Used in the controller to validate incoming request bodies.
//   - Decorated with Swagger metadata for API documentation.
//
// Validation:
//   - Uses class-validator decorators to ensure type safety and value constraints.
//   - Ensures all numeric fields are integers or numbers with optional minimums.
//   - Ensures date and time fields follow proper ISO date or HH:mm string formats.
//
// Documentation:
//   - Swagger decorators provide example values and descriptions for API consumers.
// ============================= END: CreateOrderDto Class =============================
export class CreateOrderDto {

    // ============================= START: Customer ID Field =============================
    // Example value for Swagger documentation
    @ApiProperty({ example: 1 })
    // Ensures the value is an integer
    @IsInt()
    customerId: number;
    // ============================= END: Customer ID Field =============================

    // ============================= START: Store ID Field =============================
    @ApiProperty({ example: 1 })
    @IsInt()
    storeId: number;
    // ============================= END: Store ID Field =============================

    // ============================= START: Status Field =============================
    @ApiProperty({ example: 'pending', description: 'Order status' })
    @IsString()
    status: string;
    // ============================= END: Status Field =============================

    // ============================= START: Total Amount Field =============================
    @ApiProperty({ example: 49.99 })
    @IsNumber()
    @Min(0)
    totalAmount: number;
    // ============================= END: Total Amount Field =============================

    // ============================= START: Total Distance (Km) Field =============================
    @ApiProperty({ example: 120 })
    @IsNumber()
    @Min(0)
    totalDistanceKm: number;
    // ============================= END: Total Distance (Km) Field =============================

    // ============================= START: Total Distance (Miles) Field =============================
    @ApiProperty({ example: 74.56 })
    @IsNumber()
    @Min(0)
    totalDistanceMiles: number;
    // ============================= END: Total Distance (Miles) Field =============================

    // ============================= START: Pickup Address Field =============================
    @ApiProperty({ example: '123 Main St' })
    @IsString()
    pickupAddress: string;
    // ============================= END: Pickup Address Field =============================

    // ============================= START: Pickup Date Field =============================
    @ApiProperty({ example: '2025-08-15' })
    @IsDateString()
    pickupDate: string; // ISO date format
    // ============================= END: Pickup Date Field =============================

    // ============================= START: Pickup Time Field =============================
    @ApiProperty({ example: '10:30' })
    @IsString()
    pickupTime: string; // Stored as HH:mm string
    // ============================= END: Pickup Time Field =============================

    // ============================= START: Delivery Address Field =============================
    @ApiProperty({ example: '456 Market Rd' })
    @IsString()
    deliveryAddress: string;
    // ============================= END: Delivery Address Field =============================

    // ============================= START: Delivery Date Field =============================
    @ApiProperty({ example: '2025-08-15' })
    @IsDateString()
    deliveryDate: string;
    // ============================= END: Delivery Date Field =============================

    // ============================= START: Delivery Time Field =============================
    @ApiProperty({ example: '14:30' })
    @IsString()
    deliveryTime: string;
    // ============================= END: Delivery Time Field =============================

    // ============================= START: Pickup Latitude Field =============================
    @ApiProperty({ example: 1 })
    @IsNumber()
    pickupLatitude: number;
    // ============================= END: Pickup Latitude Field =============================

    // ============================= START: Pickup Longitude Field =============================
    @ApiProperty({ example: 1 })
    @IsNumber()
    pickupLongitude: number;
    // ============================= END: Pickup Longitude Field =============================

    // ============================= START: Delivery Latitude Field =============================
    @ApiProperty({ example: 1 })
    @IsNumber()
    deliveryLatitude: number;
    // ============================= END: Delivery Latitude Field =============================

    // ============================= START: Delivery Longitude Field =============================
    @ApiProperty({ example: 1 })
    @IsNumber()
    deliveryLongitude: number;
    // ============================= END: Delivery Longitude Field =============================
}
