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
} from '@nestjs/common';
import { LogisticsProviderService } from './logistics_provider.service';
import { CreateLogisticsProviderDto } from './dto/create-logistics-provider.dto';
import { UpdateLogisticsProviderDto } from './dto/update-logistics-provider.dto';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
    ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/roles/roles.decorator';

// ================= START: Logistics Provider Controller Definition =================
// This controller is responsible for handling all routes and operations related to logistics providers.
// It includes authentication, authorization, and Swagger documentation setup.

@ApiTags('logistics_provider') // Tag for grouping endpoints under "logistics_provider" in Swagger UI
@UseGuards(JwtAuthGuard, PermissionsGuard, RolesGuard) // Guards to ensure user is authenticated and authorized
@ApiBearerAuth() // Adds a Bearer token field in Swagger for JWT authentication
@UseGuards(JwtAuthGuard, PermissionsGuard) // (Redundant call) Again specifies authentication and permission guards
@Controller('logistics_provider') // Base route for all logistics provider endpoints
// ================= END: Logistics Provider Controller Definition =================

export class LogisticsProviderController {
    // ============================ START: Constructor ============================
    // Injects the LogisticsProviderService into the controller so we can access 
    // the business logic for creating, updating, and managing logistics providers.
    constructor(private readonly service: LogisticsProviderService) { }
    // ============================= END: Constructor =============================



    // ============================ START: Create Method ============================
    // This endpoint handles the creation of a new logistics provider record.
    //
    // Method: POST
    // Access: Restricted to users with the 'Super Admin' role
    // Swagger Docs:
    //   - @ApiOperation: Describes what this endpoint does.
    //   - @ApiBody: Specifies the DTO structure required for request body.
    //   - @ApiResponse: Defines the expected HTTP status and message on success.
    // Validation:
    //   - Uses NestJS ValidationPipe to automatically validate and transform 
    //     the incoming request body into the CreateLogisticsProviderDto instance.
    //
    // Process:
    //   1. Receives request body data.
    //   2. Validates against CreateLogisticsProviderDto rules.
    //   3. Calls the service layer's create() method to store the new provider.
    //   4. Returns the created provider details as response.
    @Post()
    @HasRoles('Super Admin')
    @ApiOperation({ summary: 'Create a new logistics provider' })
    @ApiBody({ type: CreateLogisticsProviderDto })
    @ApiResponse({
        status: 201,
        description: 'Logistics provider created successfully.',
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() dto: CreateLogisticsProviderDto) {
        return this.service.create(dto);
    }
    // ============================= END: Create Method =============================

    // ============================= START: Find All Logistics Providers Method =============================

    // Decorator to mark this as a GET endpoint for retrieving data
    @Get()

    // Custom role-based access control - only users with 'Super Admin' role can access this endpoint
    @HasRoles('Super Admin')

    // Swagger documentation: provides a brief summary for API documentation
    @ApiOperation({ summary: 'Get all logistics providers' })

    // Swagger documentation: defines the possible API response for successful retrieval
    @ApiResponse({
        status: 200, // HTTP status code for success
        description: 'List of logistics providers retrieved.', // Description of the response
    })

    // Method to retrieve all logistics providers from the service layer
    findAll() {
        // Calls the service method that handles the actual retrieval of data from the database
        return this.service.findAll();
    }

    // ============================= END: Find All Logistics Providers Method =============================


    // ============================= START: Get Logistics Provider by ID =============================

    // This decorator defines a GET HTTP route that accepts a dynamic parameter `id` in the URL
    @Get(':id')

    // This custom decorator restricts access to users who have the role "Super Admin"
    @HasRoles('Super Admin')

    // This Swagger decorator provides documentation metadata, summarizing this endpoint's purpose
    @ApiOperation({ summary: 'Get logistics provider by ID' })

    // This Swagger decorator specifies that this endpoint requires a parameter named `id` of type Number
    @ApiParam({ name: 'id', type: Number })

    // This Swagger decorator describes a possible HTTP 200 response and gives a description for API docs
    @ApiResponse({
        status: 200,
        description: 'Logistics provider retrieved.',
    })

    // This method handles retrieving a single logistics provider based on the given ID parameter
    findOne(
        // This decorator extracts the `id` parameter from the route URL and parses it as an integer
        @Param('id', ParseIntPipe) id: number
    ) {
        // Calls the service method `findOne` to retrieve a logistics provider by its ID
        return this.service.findOne(id);
    }

    // ============================= END: Get Logistics Provider by ID =============================


    // ============================= START: Update Logistics Provider Method =============================

    // This decorator marks this method to handle PUT HTTP requests at the route '/:id'
    @Put(':id')

    // Restricts access to this method to users with the 'Super Admin' role
    @HasRoles('Super Admin')

    // Documents this API operation in Swagger, describing its purpose
    @ApiOperation({ summary: 'Update logistics provider (via query params)' })

    // Documents a path parameter for Swagger, specifying that 'id' is a Number
    @ApiParam({ name: 'id', type: Number })

    // Documents possible API responses in Swagger: status 200 means update successful
    @ApiResponse({
        status: 200,
        description: 'Logistics provider updated.',
    })

    // Uses a NestJS pipe to validate and transform incoming request data automatically
    @UsePipes(new ValidationPipe({ transform: true }))

    // Defines the update method that will handle the PUT request
    update(

        // Extracts the 'id' parameter from the route and ensures it is an integer
        @Param('id', ParseIntPipe) id: number,

        // Extracts the body of the request and maps it to UpdateLogisticsProviderDto
        @Body() query: UpdateLogisticsProviderDto,
    ) {
        // Calls the service layer's update method with the given id and request body
        return this.service.update(id, query);
    }

    // ============================= END: Update Logistics Provider Method =============================


    // ============================= START: Delete Method =============================
    // This will delete a logistics provider by ID
    @Delete(':id')
    // Restrict access to users with 'Super Admin' role
    @HasRoles('Super Admin')
    // Add Swagger documentation for operation summary
    @ApiOperation({ summary: 'Delete logistics provider' })
    // Define API parameter 'id' as a Number
    @ApiParam({ name: 'id', type: Number })
    // Define API response for successful deletion
    @ApiResponse({
        status: 200,
        description: 'Logistics provider deleted.',
    })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
    // ============================== END: Delete Method ==============================

}
