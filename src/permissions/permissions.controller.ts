import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Put,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions as PermissionsDecorator } from './permissions.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/roles/roles.decorator';


// ============================= START: PermissionsController =============================

// Group this controller’s endpoints under "Permissions" in Swagger UI
@ApiTags('Permissions')
// Enable Bearer token input in Swagger UI for JWT authentication
@ApiBearerAuth()
// Apply authentication and authorization guards globally on this controller
@UseGuards(JwtAuthGuard, PermissionsGuard, RolesGuard)
// Prefix all routes with '/permissions'
@Controller('permissions')
export class PermissionsController {
    // ============================= START: Constructor =============================
    // Inject PermissionsService to handle business logic and DB operations
    constructor(private readonly permissionsService: PermissionsService) { }
    // ============================= END: Constructor =============================


    // ============================= START: Create Permission Endpoint =============================
    // Handle POST requests to '/permissions'
    @Post()
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Accept request body with a DTO containing only 'name' property
    create(@Body() dto: { name: string }) {
        // Delegate creation logic to the permissions service
        return this.permissionsService.create(dto);
    }
    // ============================= END: Create Permission Endpoint =============================


    // ============================= START: Get All Permissions Endpoint =============================
    // Handle GET requests to '/permissions'
    @Get()
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Delegate retrieval of all permissions to the permissions service
    findAll() {
        return this.permissionsService.findAll();
    }
    // ============================= END: Get All Permissions Endpoint =============================


    // ============================= START: Get Permission by ID Endpoint =============================
    // Handle GET requests to '/permissions/:id'
    @Get(':id')
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Parse 'id' route parameter as integer before usage
    findOne(@Param('id', ParseIntPipe) id: number) {
        // Delegate retrieval of single permission by id to the permissions service
        return this.permissionsService.findOne(id);
    }
    // ============================= END: Get Permission by ID Endpoint =============================


    // ============================= START: Update Permission Endpoint =============================
    // Handle PUT requests to '/permissions/:id'
    @Put(':id')
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Parse 'id' route parameter as integer before usage, accept body with 'name'
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: { name: string }) {
        // Delegate update logic to the permissions service
        return this.permissionsService.update(id, dto);
    }
    // ============================= END: Update Permission Endpoint =============================


    // ============================= START: Delete Permission Endpoint =============================
    // Handle DELETE requests to '/permissions/:id'
    @Delete(':id')
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Parse 'id' route parameter as integer before usage
    remove(@Param('id', ParseIntPipe) id: number) {
        // Delegate deletion logic to the permissions service
        return this.permissionsService.remove(id);
    }
    // ============================= END: Delete Permission Endpoint =============================
}
// ============================= END: PermissionsController =============================
