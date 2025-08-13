import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';


// ============================= START: WarehousesService =============================

// Marks this class as injectable so it can be injected as a dependency
@Injectable()
export class WarehousesService {
    // ============================= START: Constructor =============================
    // Inject PrismaService instance for database interactions
    constructor(private prisma: PrismaService) { }
    // ============================= END: Constructor =============================


    // ============================= START: Create Warehouse =============================
    // Create a new warehouse record in the database with data from DTO
    create(dto: CreateWarehouseDto) {
        // Use Prisma client to create warehouse with provided data
        return this.prisma.warehouse.create({ data: dto });
    }
    // ============================= END: Create Warehouse =============================


    // ============================= START: Find All Warehouses =============================
    // Retrieve all warehouses, including their related organization data
    findAll() {
        // Use Prisma client to fetch all warehouses with eager loading of organization relation
        return this.prisma.warehouse.findMany({ include: { organization: true } });
    }
    // ============================= END: Find All Warehouses =============================


    // ============================= START: Find One Warehouse By ID =============================
    // Retrieve a single warehouse by its unique ID, including organization relation
    findOne(id: number) {
        // Use Prisma client to find unique warehouse by ID with eager loading of organization
        return this.prisma.warehouse.findUnique({
            where: { id },
            include: { organization: true },
        });
    }
    // ============================= END: Find One Warehouse By ID =============================


    // ============================= START: Update Warehouse =============================
    // Update warehouse data by ID with fields from the provided DTO
    update(id: number, dto: UpdateWarehouseDto) {
        // Use Prisma client to update warehouse where id matches, set new data fields
        return this.prisma.warehouse.update({
            where: { id },
            data: dto,
        });
    }
    // ============================= END: Update Warehouse =============================


    // ============================= START: Remove Warehouse =============================
    // Delete a warehouse record from the database by its ID
    remove(id: number) {
        // Use Prisma client to delete warehouse where id matches
        return this.prisma.warehouse.delete({ where: { id } });
    }
    // ============================= END: Remove Warehouse =============================
}

// ============================= END: WarehousesService =============================
