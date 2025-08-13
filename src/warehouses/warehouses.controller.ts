import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Query,
    Body,
    ParseIntPipe,
    UseGuards,
    ValidationPipe,
    UsePipes,
    Put,
    NotFoundException,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiParam,
    ApiBody,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/roles/roles.decorator';


// ============================= START: WarehousesController =============================

// Group all routes under 'Warehouses' tag in Swagger UI for better organization
@ApiTags('Warehouses')

// Apply authentication and authorization guards globally on this controller
@UseGuards(JwtAuthGuard, PermissionsGuard, RolesGuard)

// Enable JWT bearer token input in Swagger UI for authorization
@ApiBearerAuth()

// Apply JWT auth guard and permissions guard (note: repeated here, could be redundant)
@UseGuards(JwtAuthGuard, PermissionsGuard)

// Prefix all routes in this controller with '/warehouses'
@Controller('warehouses')
export class WarehousesController {
    // ============================= START: Constructor =============================
    // Inject WarehousesService to handle business logic and data operations
    constructor(private readonly warehousesService: WarehousesService) { }
    // ============================= END: Constructor =============================


    // ============================= START: Create Warehouse Endpoint =============================
    // Handle POST requests to create a new warehouse
    // @Permissions('create:warehouse') // (commented out) permission guard example
    @HasRoles('Super Admin') // Only allow users with 'Super Admin' role
    @ApiOperation({ summary: 'Create warehouse' }) // Swagger summary description
    @ApiBody({ type: CreateWarehouseDto }) // Expected request body type in Swagger UI
    @ApiResponse({ status: 201, description: 'Warehouse created' }) // Success response metadata
    @UsePipes(new ValidationPipe({ transform: true })) // Validate and transform incoming data
    create(@Body() dto: CreateWarehouseDto) {
        // Delegate creation logic to service
        return this.warehousesService.create(dto);
    }
    // ============================= END: Create Warehouse Endpoint =============================


    // ============================= START: Get All Warehouses Endpoint =============================
    // Handle GET requests to fetch all warehouses
    // @Permissions('read:warehouse') // (commented out) permission guard example
    @HasRoles('Super Admin') // Only allow 'Super Admin' role
    @ApiOperation({ summary: 'Get all warehouses' }) // Swagger summary description
    @ApiResponse({ status: 200, description: 'List of warehouses' }) // Success response metadata
    findAll() {
        // Delegate fetch all warehouses logic to service
        return this.warehousesService.findAll();
    }
    // ============================= END: Get All Warehouses Endpoint =============================


    // ============================= START: Get Warehouse By ID Endpoint =============================
    // Handle GET requests to fetch a warehouse by its ID
    // @Permissions('read:warehouse') // (commented out) permission guard example
    @HasRoles('Super Admin') // Only allow 'Super Admin' role
    @ApiOperation({ summary: 'Get warehouse by ID' }) // Swagger summary description
    @ApiParam({ name: 'id', type: Number }) // Swagger param definition
    @ApiResponse({ status: 200, description: 'Warehouse found' }) // Success response metadata
    // @ApiResponse({ status: 404, description: 'Warehouse not found' }) // (commented out) not found response
    async findOne(@Param('id', ParseIntPipe) id: number) {
        // Call service to find warehouse by ID
        const warehouse = await this.warehousesService.findOne(id);
        // If warehouse does not exist, throw a 404 Not Found exception
        if (!warehouse) {
            throw new NotFoundException('Warehouse not found');
        }
        // Return found warehouse
        return warehouse;
    }
    // ============================= END: Get Warehouse By ID Endpoint =============================


    // ============================= START: Update Warehouse Endpoint =============================
    // Handle PUT requests to update a warehouse by ID using query params
    // @Permissions('update:warehouse') // (commented out) permission guard example
    @HasRoles('Super Admin') // Only allow 'Super Admin' role
    @ApiOperation({ summary: 'Update warehouse (via query params)' }) // Swagger summary description
    @ApiParam({ name: 'id', type: Number }) // Swagger param definition for ID
    @ApiQuery({ name: 'fields', required: true, type: UpdateWarehouseDto }) // Swagger query param definition for update fields
    @ApiResponse({ status: 200, description: 'Warehouse updated' }) // Success response metadata
    @UsePipes(new ValidationPipe({ transform: true })) // Validate and transform incoming data
    update(
        // Parse and validate 'id' parameter as integer
        @Param('id', ParseIntPipe) id: number,
        // Get update data from query parameters
        @Query() query: UpdateWarehouseDto,
    ) {
        // Delegate update logic to service
        return this.warehousesService.update(id, query);
    }
    // ============================= END: Update Warehouse Endpoint =============================


    // ============================= START: Delete Warehouse Endpoint =============================
    // Handle DELETE requests to delete a warehouse by ID
    // @Permissions('delete:warehouse') // (commented out) permission guard example
    @HasRoles('Super Admin') // Only allow 'Super Admin' role
    @ApiOperation({ summary: 'Delete warehouse' }) // Swagger summary description
    @ApiParam({ name: 'id', type: Number }) // Swagger param definition for ID
    @ApiResponse({ status: 200, description: 'Warehouse deleted' }) // Success response metadata
    remove(@Param('id', ParseIntPipe) id: number) {
        // Delegate removal logic to service
        return this.warehousesService.remove(id);
    }
    // ============================= END: Delete Warehouse Endpoint =============================
}

// ============================= END: WarehousesController =============================
