// ============================= START: Import Statements =============================
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
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import {
    ApiTags,
    ApiBody,
    ApiQuery,
    ApiParam,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiExtraModels,
    getSchemaPath,
} from '@nestjs/swagger';
import { HasRoles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
// ============================= END: Import Statements =============================


// ============================= START: OrganizationsController =============================
// Group this controller’s endpoints under "Organizations" in Swagger UI
@ApiTags('Organizations')
// Apply authentication and authorization guards at the controller level
@UseGuards(JwtAuthGuard, PermissionsGuard, RolesGuard)
// Enable Bearer token input in Swagger UI for authorization
@ApiBearerAuth()
// (Note: Duplicate UseGuards here, could be redundant)
@UseGuards(JwtAuthGuard, PermissionsGuard)
// Prefix all routes in this controller with '/organizations'
@Controller('organizations')
export class OrganizationsController {
    // ============================= START: Constructor =============================
    // Inject the OrganizationsService to delegate business logic
    constructor(private readonly organizationsService: OrganizationsService) { }
    // ============================= END: Constructor =============================


    // ============================= START: Create Organization Endpoint =============================
    // Handle POST requests to '/organizations'
    @Post()
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Document this operation in Swagger as 'Create organization'
    @ApiOperation({ summary: 'Create organization' })
    // Document successful creation response in Swagger (HTTP 201)
    @ApiResponse({ status: 201, description: 'Organization created' })
    // Use validation pipe to transform and validate incoming data
    @UsePipes(new ValidationPipe({ transform: true }))
    // Accept CreateOrganizationDto from query parameters (unusual; normally from body)
    create(@Query() dto: CreateOrganizationDto) {
        // Call the service to create the organization
        return this.organizationsService.create(dto);
    }
    // ============================= END: Create Organization Endpoint =============================


    // ============================= START: Get All Organizations Endpoint =============================
    // Handle GET requests to '/organizations'
    @Get()
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Document this operation in Swagger as 'Get all organizations'
    @ApiOperation({ summary: 'Get all organizations' })
    // Document successful response with a list of organizations in Swagger (HTTP 200)
    @ApiResponse({ status: 200, description: 'List of organizations' })
    findAll() {
        // Call the service to retrieve all organizations
        return this.organizationsService.findAll();
    }
    // ============================= END: Get All Organizations Endpoint =============================


    // ============================= START: Get Organization by ID Endpoint =============================
    // Handle GET requests to '/organizations/:id'
    @Get(':id')
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Document this operation in Swagger as 'Get organization by id'
    @ApiOperation({ summary: 'Get organization by id' })
    // Document the 'id' parameter in Swagger, type Number
    @ApiParam({ name: 'id', type: Number })
    // Document successful response when organization is found (HTTP 200)
    @ApiResponse({ status: 200, description: 'Organization found' })
    // Parse the 'id' parameter to an integer before using it
    findOne(@Param('id', ParseIntPipe) id: number) {
        // Call the service to find one organization by id
        return this.organizationsService.findOne(id);
    }
    // ============================= END: Get Organization by ID Endpoint =============================


    // ============================= START: Update Organization Endpoint =============================
    // Handle PUT requests to '/organizations/:id'
    @Put(':id')
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Document this operation in Swagger as 'Update organization'
    @ApiOperation({ summary: 'Update organization' })
    // Document the 'id' parameter in Swagger, type Number
    @ApiParam({ name: 'id', type: Number })
    // Register UpdateOrganizationDto as extra model for Swagger schema reference
    @ApiExtraModels(UpdateOrganizationDto)
    // Document that an 'organization' query parameter can be sent with UpdateOrganizationDto shape
    @ApiQuery({
        name: 'organization',
        title: 'Update Organization Data',
        description: 'Data to update the organization',
        required: false,
        schema: { $ref: getSchemaPath(UpdateOrganizationDto) },
    })
    // Document successful update response (HTTP 200)
    @ApiResponse({ status: 200, description: 'Organization updated' })
    // Use validation pipe for incoming data
    @UsePipes(new ValidationPipe({ transform: true }))
    // Accept organization update DTO via query parameters (unusual; typically via @Body)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Query() organization: UpdateOrganizationDto,
    ) {
        // Call service to update organization by id
        return this.organizationsService.update(id, organization);
    }
    // ============================= END: Update Organization Endpoint =============================


    // ============================= START: Delete Organization Endpoint =============================
    // Handle DELETE requests to '/organizations/:id'
    @Delete(':id')
    // Restrict access to users with "Super Admin" role
    @HasRoles('Super Admin')
    // Document this operation in Swagger as 'Delete organization'
    @ApiOperation({ summary: 'Delete organization' })
    // Document the 'id' parameter in Swagger, type Number
    @ApiParam({ name: 'id', type: Number })
    // Document successful delete response (HTTP 200)
    @ApiResponse({ status: 200, description: 'Organization deleted' })
    // Parse the 'id' parameter to an integer before using it
    remove(@Param('id', ParseIntPipe) id: number) {
        // Call the service to delete the organization by id
        return this.organizationsService.remove(id);
    }
    // ============================= END: Delete Organization Endpoint =============================
}
// ============================= END: OrganizationsController =============================