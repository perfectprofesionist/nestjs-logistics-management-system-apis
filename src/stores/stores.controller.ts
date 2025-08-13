import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Put,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/roles/roles.decorator';


// ============================= START: StoresController Decorators =============================
// Group all routes under the 'stores' tag in Swagger UI
@ApiTags('stores')
// Apply guards to secure routes: JWT auth, permission checks, and role-based guards
@UseGuards(JwtAuthGuard, PermissionsGuard, RolesGuard)
// Enable Bearer token authentication support in Swagger UI
@ApiBearerAuth()
// Re-apply guards for JWT auth and permissions (redundant, consider removing one)
@UseGuards(JwtAuthGuard, PermissionsGuard)
// Prefix all controller routes with '/stores'
@Controller('stores')
// ============================= END: StoresController Decorators =============================
export class StoresController {
  // ============================= START: Constructor =============================
  // Inject the StoresService to handle business logic and DB interactions
  constructor(private readonly storesService: StoresService) { }
  // ============================= END: Constructor =============================


  // ============================= START: Create Store Endpoint =============================
  // Handle POST requests to '/stores'
  @Post()
  // Restrict to users with 'Super Admin' role
  @HasRoles('Super Admin')
  // Swagger summary for this endpoint
  @ApiOperation({ summary: 'Create a new store' })
  // Swagger request body schema
  @ApiBody({ type: CreateStoreDto })
  // Swagger response documentation for successful creation
  @ApiResponse({ status: 201, description: 'Store created successfully.' })
  // Enable validation and transformation for incoming data
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createStoreDto: CreateStoreDto) {
    // Delegate store creation to the service
    return this.storesService.create(createStoreDto);
  }
  // ============================= END: Create Store Endpoint =============================


  // ============================= START: Get All Stores Endpoint =============================
  // Handle GET requests to '/stores'
  @Get()
  // Restrict to users with 'Super Admin' role
  @HasRoles('Super Admin')
  // Swagger summary for this endpoint
  @ApiOperation({ summary: 'Get all stores' })
  // Swagger response documentation for successful retrieval
  @ApiResponse({ status: 200, description: 'List of stores retrieved.' })
  findAll() {
    // Delegate fetching all stores to the service
    return this.storesService.findAll();
  }
  // ============================= END: Get All Stores Endpoint =============================


  // ============================= START: Get Store by ID Endpoint =============================
  // Handle GET requests to '/stores/:id'
  @Get(':id')
  // Restrict to users with 'Super Admin' role
  @HasRoles('Super Admin')
  // Swagger summary for this endpoint
  @ApiOperation({ summary: 'Get store by ID' })
  // Swagger documentation for path parameter 'id'
  @ApiParam({ name: 'id', type: Number })
  // Swagger response documentation for successful retrieval
  @ApiResponse({ status: 200, description: 'Store retrieved successfully.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    // Delegate fetching a specific store by id to the service
    return this.storesService.findOne(id);
  }
  // ============================= END: Get Store by ID Endpoint =============================


  // ============================= START: Update Store Endpoint =============================
  // Handle PUT requests to '/stores/:id'
  @Put(':id')
  // Restrict to users with 'Super Admin' role
  @HasRoles('Super Admin')
  // Swagger summary for this endpoint
  @ApiOperation({ summary: 'Update store' })
  // Swagger documentation for path parameter 'id'
  @ApiParam({ name: 'id', type: Number })
  // Swagger request body schema for update data
  @ApiBody({ type: UpdateStoreDto })
  // Swagger response documentation for successful update
  @ApiResponse({ status: 200, description: 'Store updated successfully.' })
  // Enable validation and transformation for incoming data
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    // Parse 'id' parameter as integer
    @Param('id', ParseIntPipe) id: number,
    // Receive update data in the request body
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    // Delegate store update to the service
    return this.storesService.update(id, updateStoreDto);
  }
  // ============================= END: Update Store Endpoint =============================


  // ============================= START: Delete Store Endpoint =============================
  // Handle DELETE requests to '/stores/:id'
  @Delete(':id')
  // Restrict to users with 'Super Admin' role
  @HasRoles('Super Admin')
  // Swagger summary for this endpoint
  @ApiOperation({ summary: 'Delete store' })
  // Swagger documentation for path parameter 'id'
  @ApiParam({ name: 'id', type: Number })
  // Swagger response documentation for successful deletion
  @ApiResponse({ status: 200, description: 'Store deleted successfully.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    // Delegate store deletion to the service
    return this.storesService.remove(id);
  }
  // ============================= END: Delete Store Endpoint =============================
}
// ============================= END: StoresController =============================
