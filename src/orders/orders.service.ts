// ============================= START: Import Dependencies =============================
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// ============================= END: Import Dependencies =============================


// ============================= START: OrdersService Class =============================
@Injectable()
export class OrdersService {
  // ============================= START: Constructor =============================
  // Inject PrismaService for database operations
  constructor(private prisma: PrismaService) { }
  // ============================= END: Constructor =============================


  // ============================= START: Create Order =============================
  /**
   * Create a new order in the database
   * @param createOrderDto Data required to create an order
   */
  async create(createOrderDto: CreateOrderDto) {
    try {
      // Explicitly map the DTO fields to Prisma's expected input structure
      const createData: any = {
        pickupAddress: createOrderDto.pickupAddress,
        deliveryAddress: createOrderDto.deliveryAddress,
        totalDistanceKm: createOrderDto.totalDistanceKm,
        pickupLatitude: createOrderDto.pickupLatitude,
        pickupLongitude: createOrderDto.pickupLongitude,
        deliveryLatitude: createOrderDto.deliveryLatitude,
        deliveryLongitude: createOrderDto.deliveryLongitude,
        // Add any other required fields from your Prisma schema
      };

      // Optionally add customerId if provided
      if (createOrderDto.customerId !== undefined) {
        createData.customerId = createOrderDto.customerId;
      }
      // Optionally add storeId if provided
      if (createOrderDto.storeId !== undefined) {
        createData.storeId = createOrderDto.storeId;
      }

      // Create order in database with optional relations included
      const order = await this.prisma.order.create({
        data: createData,
        include: { customer: true, store: true }, // Include related customer and store
      });

      return order;
    } catch (error) {
      // Throw a BadRequestException if creation fails
      throw new BadRequestException(`Failed to create order: ${error.message}`);
    }
  }
  // ============================= END: Create Order =============================


  // ============================= START: Find All Orders =============================
  /**
   * Retrieve all orders from the database
   */
  async findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' }, // Sort by creation date descending
    });
  }
  // ============================= END: Find All Orders =============================


  // ============================= START: Find One Order =============================
  /**
   * Retrieve a single order by its ID
   * @param id Order ID
   */
  async findOne(id: number) {
    // Find order by primary key
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    // Throw NotFoundException if order does not exist
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }
  // ============================= END: Find One Order =============================


  // ============================= START: Update Order =============================
  /**
   * Update an existing order by ID
   * @param id Order ID
   * @param updateOrderDto Data to update
   */
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    // Check if order exists before update
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
    });

    // Throw if not found
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Map DTO to Prisma update data
    const prismaData: any = { ...updateOrderDto };

    // Handle customerId relation if provided by connecting to customer
    if (updateOrderDto.customerId !== undefined) {
      prismaData.customer = { connect: { id: updateOrderDto.customerId } };
      delete prismaData.customerId; // Remove raw customerId field
    }

    // Perform update in database
    return this.prisma.order.update({
      where: { id },
      data: prismaData,
    });
  }
  // ============================= END: Update Order =============================


  // ============================= START: Remove Order =============================
  /**
   * Delete an order by its ID
   * @param id Order ID
   */
  async remove(id: number) {
    // Check if order exists before delete
    const existing = await this.prisma.order.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Delete order from database
    return this.prisma.order.delete({ where: { id } });
  }
  // ============================= END: Remove Order =============================


  // ============================= START: Get Providers with Calculated Price =============================
  /**
   * Fetch all logistics providers and calculate transport price
   * for an existing order based on its totalDistanceKm
   * 
   * Formula: totalPrice = totalDistanceKm * cost_per_km
   * 
   * @param orderId ID of the order to use for distance
   */
  async getProvidersWithCalculatedPrice(orderId: number) {
    // Fetch order distance
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { totalDistanceKm: true },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Fetch all logistics providers with relevant fields
    const providers = await this.prisma.logisticsProvider.findMany({
      select: {
        id: true,
        name: true,
        cost_per_km: true,
        email: true,
        phone: true,
        website: true,
      },
    });

    // Calculate total price per provider
    const providersWithPrice = providers.map((provider) => {
      const distance = Number(order.totalDistanceKm);
      const costPerKm = Number(provider.cost_per_km);
      return {
        ...provider,
        totalPrice: parseFloat((distance * costPerKm).toFixed(2)), // Round to 2 decimals
      };
    });

    // Return sorted list by price ascending
    return {
      orderId,
      distanceKm: Number(order.totalDistanceKm),
      providers: providersWithPrice.sort((a, b) => a.totalPrice - b.totalPrice),
    };
  }
  // ============================= END: Get Providers with Calculated Price =============================


  // ============================= START: Get Logistics Providers with Transport Price =============================
  /**
   * Fetch all logistics providers and calculate transport price
   * based on given pickup & delivery addresses and distance
   * 
   * Formula: totalPrice = totalDistanceKm * cost_per_km
   * 
   * @param pickupAddress Pickup location address
   * @param deliveryAddress Delivery location address
   * @param totalDistanceKm Distance between addresses in kilometers
   */
  async getLogisticsProvidersWithTransportPrice(
    pickupAddress: string,
    deliveryAddress: string,
    totalDistanceKm: number
  ) {
    // Validate inputs
    if (!pickupAddress?.trim()) {
      throw new BadRequestException('Pickup address is required');
    }
    if (!deliveryAddress?.trim()) {
      throw new BadRequestException('Delivery address is required');
    }
    if (!totalDistanceKm || totalDistanceKm <= 0) {
      throw new BadRequestException('Total distance must be a positive number');
    }

    try {
      // Fetch all providers ordered by name ascending
      const providers = await this.prisma.logisticsProvider.findMany({
        select: {
          id: true,
          name: true,
          address: true,
          phone: true,
          email: true,
          website: true,
          cost_per_km: true,
        },
        orderBy: { name: 'asc' },
      });

      // Calculate total price for each provider
      const providersWithPrice = providers.map((provider) => {
        const distance = Number(totalDistanceKm);
        const costPerKm = Number(provider.cost_per_km);
        const totalPrice = parseFloat((distance * costPerKm).toFixed(2));
        return {
          id: provider.id,
          name: provider.name,
          address: provider.address,
          phone: provider.phone,
          email: provider.email,
          website: provider.website,
          cost_per_km: costPerKm,
          totalPrice,
        };
      });

      // Return trimmed addresses, distance, count, and sorted providers by cheapest price
      return {
        pickupAddress: pickupAddress.trim(),
        deliveryAddress: deliveryAddress.trim(),
        totalDistanceKm: Number(totalDistanceKm),
        providersCount: providersWithPrice.length,
        providers: providersWithPrice.sort((a, b) => a.totalPrice - b.totalPrice),
      };
    } catch (error) {
      // Throw generic error if fetching providers fails
      throw new Error(`Failed to fetch logistics providers: ${error.message}`);
    }
  }
  // ============================= END: Get Logistics Providers with Transport Price =============================
}
// ============================= END: OrdersService Class =============================
