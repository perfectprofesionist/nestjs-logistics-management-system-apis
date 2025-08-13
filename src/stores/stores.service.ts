// ============================= START: StoresService =============================
import { Injectable } from '@nestjs/common'; // Import Injectable decorator for dependency injection
import { PrismaService } from 'src/prisma/prisma.service'; // Import PrismaService for DB access
import { CreateStoreDto } from './dto/create-store.dto'; // Import DTO for store creation
import { UpdateStoreDto } from './dto/update-store.dto'; // Import DTO for store update

@Injectable() // Mark this class as injectable so it can be injected as a dependency
export class StoresService {
  // ============================= START: Constructor =============================
  constructor(private prisma: PrismaService) { } // Inject PrismaService for database operations
  // ============================= END: Constructor =============================

  // ============================= START: Create Store Method =============================
  create(data: CreateStoreDto) {
    // Use Prisma client to create a new store record with provided data
    return this.prisma.store.create({ data });
  }
  // ============================= END: Create Store Method =============================

  // ============================= START: Find All Stores Method =============================
  findAll() {
    // Retrieve all stores including their related organization information
    return this.prisma.store.findMany({ include: { organization: true } });
  }
  // ============================= END: Find All Stores Method =============================

  // ============================= START: Find One Store Method =============================
  findOne(id: number) {
    // Find a unique store by its ID including related organization information
    return this.prisma.store.findUnique({ where: { id }, include: { organization: true } });
  }
  // ============================= END: Find One Store Method =============================

  // ============================= START: Update Store Method =============================
  update(id: number, data: UpdateStoreDto) {
    // Update an existing store identified by ID with the new data
    return this.prisma.store.update({ where: { id }, data });
  }
  // ============================= END: Update Store Method =============================

  // ============================= START: Remove Store Method =============================
  remove(id: number) {
    // Delete a store by its ID
    return this.prisma.store.delete({ where: { id } });
  }
  // ============================= END: Remove Store Method =============================
}
// ============================= END: StoresService =============================
