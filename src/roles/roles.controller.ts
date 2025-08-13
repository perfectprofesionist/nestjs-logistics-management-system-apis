import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesService } from './roles.service';
import { Permissions } from 'src/permissions/permissions.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { HasRoles } from './roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';


// ============================= START: RolesController =============================

// Tag the controller for grouping in Swagger UI under 'Roles'
@ApiTags('Roles')

// Enable JWT Bearer authentication in Swagger UI for all endpoints in this controller
@ApiBearerAuth()

// Apply global guards to protect all routes:
// - JwtAuthGuard for JWT validation/authentication
// - PermissionsGuard to check user permissions (if enabled)
// - RolesGuard to check user roles
@UseGuards(JwtAuthGuard, PermissionsGuard, RolesGuard)

// Define this class as a NestJS controller with route prefix '/roles'
@Controller('roles')
export class RolesController {
    // ============================= START: Constructor =============================

    // Inject the RolesService to handle business logic and database operations
    constructor(private readonly rolesService: RolesService) { }

    // ============================= END: Constructor =============================


    // ============================= START: Create Role Endpoint =============================

    // Handle POST requests at '/roles' to create a new role
    @Post()

    // Allow only users with the 'Super Admin' role to access this endpoint
    @HasRoles('Super Admin')

    // Provide Swagger metadata describing this endpoint's purpose
    @ApiOperation({ summary: 'Create a new role' })

    // Document the successful response with status 201 Created
    @ApiResponse({ status: 201, description: 'Role created successfully' })

    // Describe the expected request body type for Swagger UI and validation
    @ApiBody({ type: CreateRoleDto })

    // Method to create a role; receives a validated DTO from the request body
    create(@Body() dto: CreateRoleDto) {
        // Call the RolesService to create the role and return the result
        return this.rolesService.create(dto);
    }

    // ============================= END: Create Role Endpoint =============================


    // ============================= START: Get All Roles Endpoint =============================

    // Handle GET requests at '/roles' to fetch all roles
    @Get()

    // Restrict access to users with the 'Super Admin' role only
    @HasRoles('Super Admin')

    // Swagger summary for this endpoint
    @ApiOperation({ summary: 'Get all roles' })

    // Document the successful response with a list of roles
    @ApiResponse({ status: 200, description: 'List of all roles' })

    // Method to fetch all roles by delegating to RolesService
    findAll() {
        return this.rolesService.findAll();
    }

    // ============================= END: Get All Roles Endpoint =============================


    // ============================= START: Get Role by ID Endpoint =============================

    // Handle GET requests at '/roles/:id' to fetch a single role by its ID
    @Get(':id')

    // Restrict access to 'Super Admin' users
    @HasRoles('Super Admin')

    // Swagger summary describing the purpose of this endpoint
    @ApiOperation({ summary: 'Get a single role by ID' })

    // Document a successful response with the role returned
    @ApiResponse({ status: 200, description: 'Role retrieved successfully' })

    // Document a 404 response if the role is not found
    @ApiResponse({ status: 404, description: 'Role not found' })

    // Extract 'id' from route params, validate and transform it to number
    findOne(@Param('id', ParseIntPipe) id: number) {
        // Call service to find the role by ID and return it
        return this.rolesService.findOne(id);
    }

    // ============================= END: Get Role by ID Endpoint =============================


    // ============================= START: Update Role Endpoint =============================

    // Handle PUT requests at '/roles/:id' to update an existing role by ID
    @Put(':id')

    // Restrict access to users with 'Super Admin' role
    @HasRoles('Super Admin')

    // Swagger summary describing the update endpoint
    @ApiOperation({ summary: 'Update a role by ID' })

    // Register UpdateRoleDto as an extra model in Swagger for schema reference
    @ApiExtraModels(UpdateRoleDto)

    // Describe the query parameter containing the update data, referencing UpdateRoleDto schema
    @ApiQuery({
        name: 'role',
        title: 'Update Role',
        description: 'Data to update the role',
        required: false,
        schema: { $ref: getSchemaPath(UpdateRoleDto) },
    })

    // Document the successful response on update
    @ApiResponse({ status: 200, description: 'Role updated successfully' })

    // Apply validation and transformation on incoming query data
    @UsePipes(new ValidationPipe({ transform: true }))

    // Method receives 'id' from route params and update DTO from query parameters
    update(@Param('id', ParseIntPipe) id: number, @Query() dto: UpdateRoleDto) {
        // Delegate update operation to the RolesService
        return this.rolesService.update(id, dto);
    }

    // ============================= END: Update Role Endpoint =============================


    // ============================= START: Delete Role Endpoint =============================

    // Handle DELETE requests at '/roles/:id' to delete a role by ID
    @Delete(':id')

    // Restrict deletion to 'Super Admin' users only
    @HasRoles('Super Admin')

    // Swagger summary for delete operation
    @ApiOperation({ summary: 'Delete a role by ID' })

    // Document successful delete response
    @ApiResponse({ status: 200, description: 'Role deleted successfully' })

    // Extract 'id' from route parameters, validate and transform to number
    remove(@Param('id', ParseIntPipe) id: number) {
        // Call service to remove the role and return result
        return this.rolesService.remove(id);
    }

    // ============================= END: Delete Role Endpoint =============================
}
// ============================= END: RolesController =============================
