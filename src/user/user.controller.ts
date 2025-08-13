import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { AssignRoleDto } from './dto/assign-role.dto';
import { HasRoles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// ============================= START: UsersController =============================

// Group routes under 'users' tag in Swagger UI
@ApiTags('users')
// Enable JWT bearer authentication support in Swagger
@ApiBearerAuth()
// Apply auth and permission guards globally to this controller
@UseGuards(JwtAuthGuard, PermissionsGuard, RolesGuard)
// Prefix all routes with '/users'
@Controller('users')
export class UsersController {
    // ============================= START: Constructor =============================

    // Inject UserService for user-related operations
    constructor(private readonly userService: UserService) { }

    // ============================= END: Constructor =============================


    // ============================= START: Get All Users Endpoint =============================

    // HTTP GET /users route to get all users
    @Get()

    // Only accessible by users with 'Super Admin' role
    @HasRoles('Super Admin')

    // Swagger summary description
    @ApiOperation({ summary: 'Get all users' })

    // Success response documentation
    @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })

    // Delegate retrieval of all users to UserService
    findAll() {
        return this.userService.findAll();
    }

    // ============================= END: Get All Users Endpoint =============================


    // ============================= START: Create New User Endpoint =============================

    // HTTP POST /users route to create a new user
    @Post()

    // Only accessible by 'Super Admin'
    @HasRoles('Super Admin')

    // Swagger summary
    @ApiOperation({ summary: 'Create a new user' })

    // Success response documentation
    @ApiResponse({ status: 201, description: 'User created successfully.' })

    // Swagger request body schema and description
    @ApiBody({ type: CreateUserDto, description: 'User creation data' })

    // Enable validation and auto-transformation on request body
    @UsePipes(new ValidationPipe({ transform: true }))

    // Extract validated user creation data from request body and inject Express response object (passthrough)
    async create(
        @Body() query: CreateUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        // Call UserService to create a user and return the created user
        const user = await this.userService.create(query);
        return user;
    }

    // ============================= END: Create New User Endpoint =============================


    // ============================= START: Get User By ID Endpoint =============================

    // HTTP GET /users/:id route to get user by ID
    @Get(':id')

    // Only accessible by 'Super Admin'
    @HasRoles('Super Admin')

    // Swagger summary
    @ApiOperation({ summary: 'Get user by ID' })

    // Success response documentation
    @ApiResponse({ status: 200, description: 'User retrieved successfully.' })

    // Parse 'id' param to integer and delegate to UserService to find user by ID
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    // ============================= END: Get User By ID Endpoint =============================


    // ============================= START: Update User By ID Endpoint =============================

    // HTTP PUT /users/:id route to update user by ID
    @Put(':id')

    // Only accessible by 'Super Admin'
    @HasRoles('Super Admin')

    // Swagger summary
    @ApiOperation({ summary: 'Update user by ID' })

    // Success response documentation
    @ApiResponse({ status: 200, description: 'User updated successfully.' })

    // Validation and transformation pipe on request body
    @UsePipes(new ValidationPipe({ transform: true }))

    // Parse 'id' param as integer and extract validated update data from request body
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() query: UpdateUserDto,
    ) {
        try {
            // Delegate update logic to UserService
            return this.userService.update(id, query);
        } catch (error) {
            // Forward any errors encountered
            throw error;
        }
    }

    // ============================= END: Update User By ID Endpoint =============================


    // ============================= START: Delete User By ID Endpoint =============================

    // HTTP DELETE /users/:id route to delete user by ID
    @Delete(':id')

    // Only accessible by 'Super Admin'
    @HasRoles('Super Admin')

    // Swagger summary
    @ApiOperation({ summary: 'Delete user by ID' })

    // Success response documentation
    @ApiResponse({ status: 200, description: 'User deleted successfully.' })

    // Delegate removal to UserService
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }

    // ============================= END: Delete User By ID Endpoint =============================


    // ============================= START: Assign Role to User Endpoint =============================

    // HTTP POST /users/:id/assign-role route to assign a role to a user
    @Post(':id/assign-role')

    // Only accessible by 'Super Admin'
    @HasRoles('Super Admin')

    // Swagger summary
    @ApiOperation({ summary: 'Assign a role to a user' })

    // Success response documentation
    @ApiResponse({ status: 200, description: 'Role assigned successfully.' })

    // Parse 'id' param to integer and extract role assignment data from request body
    assignRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AssignRoleDto
    ) {
        // Delegate role assignment to UserService
        return this.userService.assignRole(id, dto.roleId);
    }

    // ============================= END: Assign Role to User Endpoint =============================
}

// ============================= END: UsersController =============================
