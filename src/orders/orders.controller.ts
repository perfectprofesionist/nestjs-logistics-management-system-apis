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
  Query,
  ParseFloatPipe,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HasRoles } from 'src/roles/roles.decorator';

// ============================= START: Swagger Tag for Orders =============================
// Decorator to group this controller's routes under 'orders' tag in Swagger UI
@ApiTags('orders')
// ============================= END: Swagger Tag for Orders =============================


// ============================= START: Swagger Bearer Authentication =============================
// Decorator to specify that this controller uses Bearer authentication (JWT) in Swagger
@ApiBearerAuth()
// ============================= END: Swagger Bearer Authentication =============================


// ============================= START: Use Multiple Guards =============================
// Apply JWT authentication guard, permissions guard, and roles guard to all controller routes
@UseGuards(JwtAuthGuard, PermissionsGuard, RolesGuard) // ✅ Single declaration for multiple guards
// ============================= END: Use Multiple Guards =============================


// ============================= START: Controller Decorator =============================
// Define the base route path for this controller as '/orders'
@Controller('orders')
// ============================= END: Controller Decorator =============================

export class OrdersController {
  // ============================= START: Constructor Injection of OrdersService =============================
  // Inject OrdersService to use its methods within this controller
  constructor(private readonly ordersService: OrdersService) { }
  // ============================= END: Constructor Injection of OrdersService =============================


  // ============================= START: GET /orders - Find All Orders =============================
  // Route handler for GET requests to '/orders' to fetch all orders

  // Specify that only users with the 'Super Admin' role can access this endpoint
  @HasRoles('Super Admin')

  // Swagger operation summary for documentation
  @ApiOperation({ summary: 'Get all orders' })

  // Swagger response documentation with status code and description
  @ApiResponse({ status: 200, description: 'List of orders retrieved.' })

  // Method to call the service and return all orders
  findAll() {
    return this.ordersService.findAll();
  }
  // ============================= END: GET /orders - Find All Orders =============================


  // ============================= START: Create New Order Endpoint - POST /orders =============================

  // Define POST endpoint to create a new order
  @Post()

  // Restrict access to users with 'Super Admin' role only
  @HasRoles('Super Admin')

  // Document this endpoint with a summary for Swagger UI
  @ApiOperation({ summary: 'Create a new order' })

  // Specify the request body schema for Swagger, using CreateOrderDto
  @ApiBody({ type: CreateOrderDto })

  // Document the successful creation response with HTTP status 201
  @ApiResponse({ status: 201, description: 'Order created successfully.' })

  // Apply validation pipe to automatically validate and transform the incoming request body
  @UsePipes(new ValidationPipe({ transform: true }))

  // Controller method to handle creating a new order
  // Receives the validated DTO from the request body and passes it to the ordersService
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // ============================= END: Create New Order Endpoint - POST /orders =============================


  // ============================= START: Get Order by ID Endpoint - GET /orders/:id =============================

  // Route handler for GET requests to '/orders/:id' to fetch a specific order by its ID
  @Get(':id')

  // Restrict access to users with 'Super Admin' role only
  @HasRoles('Super Admin')

  // Swagger operation summary for this endpoint
  @ApiOperation({ summary: 'Get order by ID' })

  // Swagger parameter documentation specifying the 'id' path parameter as a number
  @ApiParam({ name: 'id', type: Number })

  // Swagger response documentation for successful retrieval with HTTP status 200
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })

  // Controller method to find an order by its ID, parsing 'id' as an integer via ParseIntPipe
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  // ============================= END: Get Order by ID Endpoint - GET /orders/:id =============================

  // ============================= START: Update Order by ID Endpoint - PUT /orders/:id =============================

  // Route handler for PUT requests to '/orders/:id' to update a specific order by its ID
  @Put(':id')

  // Restrict access to users with 'Super Admin' role only
  @HasRoles('Super Admin')

  // Swagger operation summary for this endpoint
  @ApiOperation({ summary: 'Update order' })

  // Swagger parameter documentation specifying the 'id' path parameter as a number
  @ApiParam({ name: 'id', type: Number })

  // Swagger response documentation for successful update with HTTP status 200
  @ApiResponse({ status: 200, description: 'Order updated successfully.' })

  // Apply validation pipe to automatically validate and transform the incoming request data
  @UsePipes(new ValidationPipe({ transform: true }))

  // Controller method to update an order by its ID
  // Parses 'id' as an integer and accepts update data as a query parameter of type UpdateOrderDto
  update(
    @Param('id', ParseIntPipe) id: number,
    @Query() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  // ============================= END: Update Order by ID Endpoint - PUT /orders/:id =============================


  // ============================= START: Delete Order by ID Endpoint - DELETE /orders/:id =============================

  // Route handler for DELETE requests to '/orders/:id' to delete a specific order by its ID
  @Delete(':id')

  // Restrict access to users with 'Super Admin' role only
  @HasRoles('Super Admin')

  // Swagger operation summary for this endpoint
  @ApiOperation({ summary: 'Delete order' })

  // Swagger parameter documentation specifying the 'id' path parameter as a number
  @ApiParam({ name: 'id', type: Number })

  // Swagger response documentation for successful deletion with HTTP status 200
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })

  // Controller method to remove an order by its ID, parsing 'id' as an integer
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }

  // ============================= END: Delete Order by ID Endpoint - DELETE /orders/:id =============================


  // ============================= START: Get Providers with Calculated Delivery Price Endpoint - GET /orders/provider-quotes/:orderId =============================

  // Route handler for GET requests to '/orders/provider-quotes/:orderId' to fetch logistics providers with delivery prices calculated for the specified order
  // FIXED: Changed route to avoid conflict with the generic ':id' route
  @Get('provider-quotes/:orderId')

  // Restrict access to users with 'Super Admin' role only
  @HasRoles('Super Admin')

  // Swagger operation summary describing the purpose of this endpoint
  @ApiOperation({ summary: 'Get providers with calculated delivery price for a specific order' })

  // Swagger parameter documentation specifying 'orderId' path parameter as a number with description
  @ApiParam({ name: 'orderId', type: Number, description: 'Order ID to calculate cost for' })

  // Swagger response documentation for successful retrieval with HTTP status 200
  @ApiResponse({ status: 200, description: 'List of providers with calculated price' })

  // Controller method that accepts orderId and returns providers with calculated delivery prices
  getProvidersWithPrice(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.getProvidersWithCalculatedPrice(orderId);
  }

  // ============================= END: Get Providers with Calculated Delivery Price Endpoint - GET /orders/provider-quotes/:orderId =============================


  // ============================= START: Get Logistics Providers with Transport Prices Endpoint - GET /orders/logistics-providers/quotes =============================

  // Route handler for GET requests to '/orders/logistics-providers/quotes'
  // NEW ENDPOINT: Get logistics providers with transport prices calculated based on pickup and delivery addresses and total distance
  @Get('logistics-providers/quotes')

  // Restrict access to users with 'Super Admin' role only
  @HasRoles('Super Admin')

  // Swagger operation summary and description for this endpoint
  @ApiOperation({
    summary: 'Get logistics providers with calculated transport prices',
    description: 'Calculate transport costs for all logistics providers based on pickup address, delivery address, and total distance. Formula: totalPrice = totalDistanceKm × cost_per_km'
  })

  // Swagger query parameter for pickup address with example
  @ApiQuery({
    name: 'pickupAddress',
    type: String,
    description: 'Pickup location address',
    example: '123 Warehouse St, Mumbai, Maharashtra, India'
  })

  // Swagger query parameter for delivery address with example
  @ApiQuery({
    name: 'deliveryAddress',
    type: String,
    description: 'Delivery location address',
    example: '456 Customer Ave, Delhi, India'
  })

  // Swagger query parameter for total distance in kilometers with example
  @ApiQuery({
    name: 'totalDistanceKm',
    type: Number,
    description: 'Total distance in kilometers',
    example: 150.75
  })

  // Swagger response documentation for success with detailed schema describing returned object and providers list
  @ApiResponse({
    status: 200,
    description: 'List of logistics providers with calculated transport prices (sorted by price - cheapest first)',
    schema: {
      type: 'object',
      properties: {
        pickupAddress: {
          type: 'string',
          example: '123 Warehouse St, Mumbai, Maharashtra, India'
        },
        deliveryAddress: {
          type: 'string',
          example: '456 Customer Ave, Delhi, India'
        },
        totalDistanceKm: {
          type: 'number',
          example: 150.75
        },
        providersCount: {
          type: 'number',
          example: 3
        },
        providers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'FastShip Logistics' },
              address: { type: 'string', example: '789 Transport Hub, Pune' },
              phone: { type: 'string', example: '+91-9876543210' },
              email: { type: 'string', example: 'contact@fastship.com' },
              website: { type: 'string', example: 'https://fastship.com' },
              cost_per_km: { type: 'number', example: 2.50 },
              totalPrice: { type: 'number', example: 376.88 }
            }
          }
        }
      }
    }
  })

  // Swagger response for bad request
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid input parameters' })

  // Swagger response for internal server error
  @ApiResponse({ status: 500, description: 'Internal Server Error' })

  // Controller method accepting query parameters, with totalDistanceKm parsed as float, returning calculated transport prices from service
  getLogisticsProvidersWithTransportPrice(
    @Query('pickupAddress') pickupAddress: string,
    @Query('deliveryAddress') deliveryAddress: string,
    @Query('totalDistanceKm', ParseFloatPipe) totalDistanceKm: number,
  ) {
    return this.ordersService.getLogisticsProvidersWithTransportPrice(
      pickupAddress,
      deliveryAddress,
      totalDistanceKm
    );
  }

  // ============================= END: Get Logistics Providers with Transport Prices Endpoint - GET /orders/logistics-providers/quotes =============================

}
